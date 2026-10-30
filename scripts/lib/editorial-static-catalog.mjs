import ts from "typescript";

const unwrap = (node) => {
  while (node && (ts.isAsExpression(node) || ts.isParenthesizedExpression(node))) node = node.expression;
  return node;
};

export function namedInitializer(source, name) {
  const file = ts.createSourceFile("editorial.tsx", source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  if (file.parseDiagnostics.length) throw new Error(`Fonte editorial inválida: ${file.parseDiagnostics[0].messageText}`);
  for (const statement of file.statements) {
    if (!ts.isVariableStatement(statement)) continue;
    for (const declaration of statement.declarationList.declarations) {
      if (declaration.name.getText(file) === name) return { file, node: unwrap(declaration.initializer) };
    }
  }
  throw new Error(`Declaração editorial ausente: ${name}`);
}

const propertyName = (node) => node && (ts.isStringLiteral(node) || ts.isIdentifier(node)) ? node.text : undefined;
const property = (node, name) => node.properties.find((p) => ts.isPropertyAssignment(p) && propertyName(p.name) === name)?.initializer;

export function readStringArray(source, name) {
  const { node } = namedInitializer(source, name);
  if (!node || !ts.isArrayLiteralExpression(node) || node.elements.some((e) => !ts.isStringLiteral(e))) {
    throw new Error(`${name} deve ser um array literal de strings`);
  }
  return node.elements.map((e) => e.text);
}

/** Mesma precedência da página: base < suplementares < programáticos. Não executa TSX. */
export function readArticleCatalog(sources) {
  const catalog = new Map();
  for (const { source, name, definitions = false } of sources) {
    const { file, node } = namedInitializer(source, name);
    if (!node || !(definitions ? ts.isArrayLiteralExpression(node) : ts.isObjectLiteralExpression(node))) {
      throw new Error(`Catálogo inválido: ${name}`);
    }
    const entries = definitions ? node.elements : node.properties;
    for (const entry of entries) {
      const value = definitions ? entry : ts.isPropertyAssignment(entry) ? entry.initializer : undefined;
      if (!value || !ts.isObjectLiteralExpression(value)) throw new Error(`Entrada não literal em ${name}`);
      const slugNode = definitions ? property(value, "slug") : undefined;
      const slug = definitions && slugNode && ts.isStringLiteral(slugNode) ? slugNode.text : propertyName(entry.name);
      if (!slug) throw new Error(`Slug inválido em ${name}`);
      const title = property(value, "title");
      const body = definitions ? value : property(value, "content");
      const links = new Set();
      function visit(child) {
        if (ts.isJsxAttribute(child) && ["to", "href"].includes(child.name.getText(file))) {
          const initializer = child.initializer;
          const target = initializer && ts.isJsxExpression(initializer) ? initializer.expression : initializer;
          if (target && ts.isStringLiteral(target)) links.add(target.text);
        }
        // Programmatic sections may render HTML links stored in literal strings.
        if (definitions && ts.isStringLiteral(child)) {
          for (const match of child.text.matchAll(/<a\b[^>]*\bhref=["']([^"']+)["']/g)) links.add(match[1]);
        }
        ts.forEachChild(child, visit);
      }
      if (body) visit(body);
      catalog.set(slug, { title: title && ts.isStringLiteral(title) ? title.text : null, body: body?.getText(file) || "", links });
    }
  }
  return catalog;
}
