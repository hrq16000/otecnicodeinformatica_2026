import { access, mkdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const source = path.join(root, "public/fotos/bancada-tecnica.jpg");
const variants = [
  { width: 360, file: "bancada-tecnica-360.webp" },
  { width: 640, file: "bancada-tecnica-640.webp" },
];

const sourceStat = await stat(source);
await mkdir(path.dirname(source), { recursive: true });

for (const variant of variants) {
  const output = path.join(root, "public/fotos", variant.file);
  let current = false;
  try {
    const outputStat = await stat(output);
    current = outputStat.mtimeMs >= sourceStat.mtimeMs;
  } catch {
    // A variante ainda nao existe.
  }

  if (current) {
    console.log(`[home-hero] atual: ${variant.file}`);
    continue;
  }

  const temporary = `${output}.tmp`;
  await sharp(source)
    .rotate()
    .resize({ width: variant.width, withoutEnlargement: true })
    .webp({ quality: 72, effort: 4, smartSubsample: true })
    .toFile(temporary);

  await access(temporary);
  const { rename } = await import("node:fs/promises");
  await rename(temporary, output);
  const outputStat = await stat(output);
  console.log(
    `[home-hero] gerado: ${variant.file} (${Math.round(outputStat.size / 1024)} KiB)`,
  );
}
