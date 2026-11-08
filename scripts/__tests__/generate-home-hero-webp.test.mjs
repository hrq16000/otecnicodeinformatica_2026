import { describe, expect, it } from "vitest";
import { mkdtemp, readFile, rm, stat } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import sharp from "sharp";
import { generateHomeHeroWebp } from "../generate-home-hero-webp.mjs";

describe("home hero mobile — WebP gerado sem alterar fonte", () => {
  it("converte JPEG de teste para WebP responsivo e sem metadados", async () => {
    const dir = await mkdtemp(path.join(os.tmpdir(), "home-hero-"));
    const source = path.join(dir, "bancada.jpg");
    const output = path.join(dir, "bancada-768.webp");
    try {
      await sharp({ create: {
        width: 1400, height: 980, channels: 3,
        background: { r: 117, g: 151, b: 171 },
      } }).jpeg({ quality: 94 }).toFile(source);
      const before = await readFile(source);
      const size = (await stat(source)).size;
      const result = await generateHomeHeroWebp({ source, output });
      expect((await stat(output)).size).toBeLessThan(size);
      expect(result.webpBytes).toBeLessThan(result.originalBytes);
      const meta = await sharp(output).metadata();
      expect(meta.format).toBe("webp");
      expect(meta.width).toBe(768);
      expect(meta.exif).toBeUndefined();
      expect(meta.xmp).toBeUndefined();
      expect(await readFile(source)).toEqual(before);
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });

  it("preload e picture apontam para a mesma variante gerada", async () => {
    const root = new URL("../../", import.meta.url);
    const hero = await readFile(new URL("src/components/home/HeroTriagem.tsx", root), "utf8");
    const route = await readFile(new URL("src/routes/index.tsx", root), "utf8");
    expect(hero).toContain('srcSet="/fotos/bancada-tecnica-768.webp"');
    expect(hero).toContain('src="/fotos/bancada-tecnica.jpg"');
    expect(route).toContain('href: "/fotos/bancada-tecnica-768.webp"');
    expect(route).toContain('type: "image/webp"');
  });
});
