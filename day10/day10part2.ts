const map = Deno.readTextFileSync("input").split("\n").filter((l) => l);

const mapW = map[0].length;
const mapH = map.length;

const inMap = (x: number, y: number) =>
  x >= 0 && x < mapW && y >= 0 && y < mapH;

const at = (x: number, y: number) => Number(map[y][x]);

const directions = [
  { x: 1, y: 0 },
  { x: -1, y: 0 },
  { x: 0, y: 1 },
  { x: 0, y: -1 },
];

const findTrailScore = (x: number, y: number) => {
  const current = at(x, y);
  if (current == 9) {
    return 1;
  }
  let total = 0;
  for (const d of directions) {
    if (inMap(x + d.x, y + d.y) && at(x + d.x, y + d.y) == current + 1) {
      total += findTrailScore(x + d.x, y + d.y);
    }
  }
  return total;
};

let total = 0;

for (let y = 0; y < mapH; y++) {
  for (let x = 0; x < mapW; x++) {
    if (at(x, y) == 0) {
      total += findTrailScore(x, y);
    }
  }
}

console.log(total);
