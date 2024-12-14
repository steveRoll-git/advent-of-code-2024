const mapW = 101;
const mapH = 103;

const input = Deno.readTextFileSync("input");

const robots = [];

const mod = (a: number, b: number) => (a % b + b) % b;

for (const match of input.matchAll(/p=(\d+),(\d+) v=(\-?\d+),(\-?\d+)/g)) {
  const [, x, y, vx, vy] = match.map((n) => Number(n));
  robots.push({ x, y, vx, vy });
}

for (let i = 0; i < 100; i++) {
  for (const r of robots) {
    r.x = mod(r.x + r.vx, mapW);
    r.y = mod(r.y + r.vy, mapH);
  }
}

const quadrants = [0, 0, 0, 0];

const hx = Math.floor(mapW / 2);
const hy = Math.floor(mapH / 2);

for (const r of robots) {
  if (r.x == hx || r.y == hy) {
    continue;
  }
  const qx = r.x < hx ? 0 : 2;
  const qy = r.y < hy ? 0 : 1;
  quadrants[qy + qx]++;
}

console.log(quadrants.reduce((a, b) => a * b, 1));
