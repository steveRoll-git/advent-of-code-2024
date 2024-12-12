const map = Deno.readTextFileSync("input").split("\n").filter((r) => r);

const mapW = map[0].length;
const mapH = map.length;

const inMap = (x: number, y: number) =>
  x >= 0 && x < mapW && y >= 0 && y < mapH;

const h = (x: number, y: number) => `${x} ${y}`;
const p = (s: string): number[] => s.split(" ").map((n) => Number(n));

const at = (x: number, y: number) => inMap(x, y) ? map[y][x] : "";

const unmappedTiles = new Set<string>();
for (let y = 0; y < mapH; y++) {
  for (let x = 0; x < mapW; x++) {
    unmappedTiles.add(h(x, y));
  }
}

type Region = {
  letter: string;
  tiles: Set<string>;
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
};

type Direction = { x: number; y: number };

const directions: Direction[] = [
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
  const region: Region = {
    letter: at(x, y),
    tiles: new Set(),
    minX: x,
    minY: y,
    maxX: x,
    maxY: y,
  };
  regions.push(region);
  while (queue.length > 0) {
    const [qx, qy] = queue.shift()!;
    region.tiles.add(h(qx, qy));
    region.minX = Math.min(region.minX, qx);
    region.minY = Math.min(region.minY, qy);
    region.maxX = Math.max(region.maxX, qx);
    region.maxY = Math.max(region.maxY, qy);
    for (const d of directions) {
      const dx = qx + d.x, dy = qy + d.y;
      if (
        inMap(dx, dy) &&
        unmappedTiles.has(h(dx, dy)) &&
        at(dx, dy) == region.letter
      ) {
        unmappedTiles.delete(h(dx, dy));
        queue.push([dx, dy]);
      }
    }
  }
}

let total = 0;

for (const r of regions) {
  const mappedBorders = new Map<Direction, Set<string>>();
  for (const d of directions) {
    mappedBorders.set(d, new Set());
  }

  let sideCount = 0;

  for (let y = r.minY; y <= r.maxY; y++) {
    for (let x = r.minX; x <= r.maxX; x++) {
      if (r.tiles.has(h(x, y))) {
        for (const d of directions) {
          let dx = x + d.x, dy = y + d.y;
          if (
            !r.tiles.has(h(dx, dy)) && !mappedBorders.get(d)!.has(h(dx, dy))
          ) {
            let fx = x, fy = y;
            const px = d.x == 0 ? 1 : 0;
            const py = d.y == 0 ? 1 : 0;

            do {
              mappedBorders.get(d)!.add(h(dx, dy));
              fx += px;
              dx += px;
              fy += py;
              dy += py;
            } while (r.tiles.has(h(fx, fy)) && !r.tiles.has(h(dx, dy)));
            sideCount++;
          }
        }
      }
    }
  }

  total += sideCount * r.tiles.size;
}

console.log(total);
