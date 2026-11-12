import { Children, Fragment, isValidElement, type ReactNode } from "react";

export type EmbeddedFaqItem = { q: string; a: string };

function textOf(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (!isValidElement<{ children?: ReactNode }>(node)) return "";
  return Children.toArray(node.props.children).map(textOf).join(" ").replace(/\s+/g, " ").trim();
}

function topLevel(node: ReactNode): ReactNode[] {
  if (isValidElement<{ children?: ReactNode }>(node) && node.type === Fragment) {
    return Children.toArray(node.props.children);
  }
  return Children.toArray(node);
}

/** Extrai H3 + resposta visível depois do H2 "Perguntas frequentes". */
export function extractEmbeddedFaq(node: ReactNode): EmbeddedFaqItem[] {
  const children = topLevel(node);
  const start = children.findIndex(
    (child) =>
      isValidElement(child) &&
      child.type === "h2" &&
      textOf(child).toLocaleLowerCase("pt-BR") === "perguntas frequentes",
  );
  if (start < 0) return [];

  const items: EmbeddedFaqItem[] = [];
  let question = "";
  let answer: string[] = [];
  const flush = () => {
    const a = answer.join(" ").replace(/\s+/g, " ").trim();
    if (question && a) items.push({ q: question, a });
    question = "";
    answer = [];
  };

  for (const child of children.slice(start + 1)) {
    if (!isValidElement(child)) continue;
    if (child.type === "h2") break;
    if (child.type === "h3") {
      flush();
      question = textOf(child);
      continue;
    }
    if (question) {
      const text = textOf(child);
      if (text) answer.push(text);
    }
  }
  flush();
  return items;
}
