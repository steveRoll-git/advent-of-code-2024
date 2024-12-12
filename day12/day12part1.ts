const map = Deno.readTextFileSync("input").split("\n").filter((r) => r);

const mapW = map[0].length;
const mapH = map.length;

const inMap = (x: number, y: number) =>
  x >= 0 && x < mapW && y >= 0 && y < mapH;

const h = (x: number, y: number) => `${x} ${y}`;
const p = (s: string): number[] => s.split(" ").map((n) => Number(n));

const at = (x: number, y: number) => map[y][x];

const unmappedTiles = new Set<string>();
for (let y = 0; y < mapH; y++) {
  for (let x = 0; x < mapW; x++) {
    unmappedTiles.add(h(x, y));
  }
}

type Region = {
  letter: string;
  tiles: Set<string>;
};

const directions = [
  { x: 1, y: 0 },
  { x: -1, y: 0 },
  { x: 0, y: 1 },
  { x: 0, y: -1 },
];

const regions: Region[] = [];

while (unmappedTiles.size > 0) {
  const u = unmappedTiles.values().next().value!;
  unmappedTiles.delete(u);
  const [x, y] = p(u);
  const queue: [number, number][] = [[x, y]];
  const region: Region = { letter: at(x, y), tiles: new Set() };
  regions.push(region);
  while (queue.length > 0) {
    const [qx, qy] = queue.shift()!;
    region.tiles.add(h(qx, qy));
    for (const d of directions) {
      const dx = qx + d.x, dy = qy + d.y;
      if (inMap(dx, dy) && unmappedTiles.has(h(dx, dy))) {
        if (at(dx, dy) == region.letter) {
          unmappedTiles.delete(h(dx, dy));
          queue.push([dx, dy]);
        }
      }
    }
  }
}

let total = 0;

for (const r of regions) {
  let perimeter = 0;
  let area = 0;
  for (const t of r.tiles) {
    const [x, y] = p(t);
    for (const d of directions) {
      const dx = x + d.x, dy = y + d.y;
      if (!r.tiles.has(h(dx, dy))) {
        perimeter++;
      }
    }
    area++;
  }
  total += perimeter * area;
}

console.log(total);
