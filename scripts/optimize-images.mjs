import { mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const targets = [
  {
    input: "public/images/conveyor/conveyor-1.jpg",
    output: "public/images/optimized/conveyor-1.webp",
    width: 1350,
    quality: 76,
  },
  {
    input: "public/images/conveyor/conveyor-2.jpg",
    output: "public/images/optimized/conveyor-2.webp",
    width: 1350,
    quality: 76,
  },
  {
    input: "public/images/conveyor/conveyor-3.jpg",
    output: "public/images/optimized/conveyor-3.webp",
    width: 1600,
    quality: 76,
  },
  {
    input: "public/images/conveyor/conveyor-4.jpg",
    output: "public/images/optimized/conveyor-4.webp",
    width: 1350,
    quality: 76,
  },
  {
    input: "public/images/conveyor/conveyor-5.jpg",
    output: "public/images/optimized/conveyor-5.webp",
    width: 1350,
    quality: 76,
  },
  {
    input: "public/images/coach-classroom-1.jpg",
    output: "public/images/optimized/coach-classroom-1.webp",
    width: 1920,
    quality: 78,
  },
  {
    input: "public/images/coach-classroom-2.jpg",
    output: "public/images/optimized/coach-classroom-2.webp",
    width: 945,
    quality: 78,
  },
  {
    input: "public/images/students-cafeteria-chess.webp",
    output: "public/images/optimized/students-cafeteria-chess.webp",
    width: 1600,
    quality: 78,
  },
];

async function optimizeTarget(target) {
  const inputPath = resolve(root, target.input);
  const outputPath = resolve(root, target.output);

  await mkdir(dirname(outputPath), { recursive: true });

  const image = sharp(inputPath, { animated: false }).rotate();
  const before = await image.metadata();

  const result = await image
    .resize({ width: target.width, withoutEnlargement: true })
    .webp({ quality: target.quality, effort: 5 })
    .toFile(outputPath);

  return {
    input: target.input,
    output: target.output,
    before: `${before.width}x${before.height}`,
    after: `${result.width}x${result.height}`,
    sizeKb: Math.round(result.size / 1024),
  };
}

const results = await Promise.all(targets.map(optimizeTarget));
for (const result of results) {
  console.log(`${result.output}: ${result.before} -> ${result.after}, ${result.sizeKb}KB`);
}
