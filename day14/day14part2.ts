import { Image } from "https://deno.land/x/imagescript@1.3.0/mod.ts";

const mapW = 101;
const mapH = 103;

const input = Deno.readTextFileSync("input");

const robots = [];
const rMap = new Map<number, number>();
const ind = (x: number, y: number) => y * mapW + x;
for (let y = 0; y < mapH; y++) {
  for (let x = 0; x < mapW; x++) {
    rMap.set(ind(x, y), 0);
  }
}

const generateImage = async () => {
  const img = new Image(mapW, mapH);
  for (let y = 0; y < mapH; y++) {
    for (let x = 0; x < mapW; x++) {
      const c = rMap.get(ind(x, y))!;
      img.setPixelAt(x + 1, y + 1, c > 0 ? 0xffffff : 0);
    }
  }
  return await img.encode(2);
};

const mod = (a: number, b: number) => (a % b + b) % b;

for (const match of input.matchAll(/p=(\d+),(\d+) v=(\-?\d+),(\-?\d+)/g)) {
  const [, x, y, vx, vy] = match.map((n) => Number(n));
  rMap.set(ind(x, y), rMap.get(ind(x, y))! + 1);
  robots.push({ x, y, vx, vy });
}

for (let i = 1; i < 100000; i++) {
  for (const r of robots) {
    rMap.set(ind(r.x, r.y), rMap.get(ind(r.x, r.y))! - 1);
    r.x = mod(r.x + r.vx, mapW);
    r.y = mod(r.y + r.vy, mapH);
    rMap.set(ind(r.x, r.y), rMap.get(ind(r.x, r.y))! + 1);
  }
  if ((i - 11) % mapW == 0) {
    const data = await generateImage();
    // Deno.writeFileSync(`images/${i}.png`, data);
    if (data.byteLength <= 1044) {
      console.log(i);
      break;
    }
  }
}
