#!/usr/bin/env node
/**
 * Fail closed before builds if an old TanStack Start server function API
 * survives a dependency update. The removed .inputValidator() causes SSR 500.
 */
import { readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";

const root = join(process.cwd(), "src");
const stale = [];
const legacy = /\.inputValidator\s*\(/g;

function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "__tests__" || entry.name === "__mocks__") continue;
      walk(full);
      continue;
    }
    if (!entry.isFile() || !/\.[cm]?[jt]sx?$/.test(entry.name)) continue;
    const lines = readFileSync(full, "utf8").split("\n");
    for (let i = 0; i < lines.length; i++) {
      legacy.lastIndex = 0;
      if (legacy.test(lines[i])) stale.push(relative(process.cwd(), full) + ":" + (i + 1));
    }
  }
}

walk(root);
if (stale.length) {
  console.error("Legacy TanStack Start .inputValidator() breaks SSR. Replace with .validator():");
  for (const location of stale) console.error(" - " + location);
  process.exitCode = 1;
} else {
  console.log("TanStack Start server function API: no removed inputValidator calls.");
}
