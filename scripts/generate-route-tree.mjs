#!/usr/bin/env node
/**
 * Roda o MESMO gerador oficial usado pelo plugin TanStack/Vite.
 * Evita pressupor o CLI `tsr`, que não é dependência instalada.
 * A versão do router-generator está fixada em package.json/lock.
 */
import { Generator, getConfig } from "@tanstack/router-generator";

const root = process.cwd();
const config = getConfig({}, root);
await new Generator({ config, root }).run();
console.log("[routes:generate] árvore TanStack regenerada");
