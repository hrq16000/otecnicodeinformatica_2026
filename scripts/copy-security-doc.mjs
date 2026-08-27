#!/usr/bin/env node
/**
 * Publica SECURITY.md como artefato estático (`public/SECURITY.md`) para que o
 * painel /admin/os-audit possa linkar as decisões de segurança vigentes sem
 * duplicar conteúdo. Fonte única: SECURITY.md na raiz.
 */
import { copyFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const origem = resolve(process.cwd(), "SECURITY.md");
const destino = resolve(process.cwd(), "public/SECURITY.md");

if (!existsSync(origem)) {
  console.error("BLOQUEADO: SECURITY.md ausente na raiz do repositório.");
  process.exit(1);
}

copyFileSync(origem, destino);
console.log("OK — SECURITY.md publicado em public/SECURITY.md.");
