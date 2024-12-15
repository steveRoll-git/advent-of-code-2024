const tiles = {
  empty: ".",
  wall: "#",
  box: "O",
};

const input = Deno.readTextFileSync("input");

const mapW = 50, mapH = 50;

const map = input.substring(0, (mapW + 1) * mapH - 1).split("\n");

const at = (x: number, y: number) => map[y][x];

const mapSet = (x: number, y: number, v: string) => {
  const row = map[y];
  map[y] = row.substring(0, x) + v + row.substring(x + 1);
};

const robot = { x: 0, y: 0 };

for (let y = 0; y < mapH; y++) {
  const x = map[y].indexOf("@");
  if (x > 0) {
    robot.x = x;
    robot.y = y;
    map[y] = map[y].replace("@", ".");
    break;
  }
}

const directions = {
  ["<"]: { x: -1, y: 0 },
  [">"]: { x: 1, y: 0 },
  ["^"]: { x: 0, y: -1 },
  ["v"]: { x: 0, y: 1 },
};

for (const [d] of input.matchAll(/[v<>\^]/g)) {
  const dir = directions[d as keyof typeof directions];
  let cx = robot.x, cy = robot.y;
  const boxes = [];
  while (true) {
    cx += dir.x;
    cy += dir.y;
    const t = at(cx, cy);
    if (t == tiles.box) {
      boxes.unshift({ x: cx, y: cy });
    } else if (t == tiles.empty) {
      robot.x += dir.x;
      robot.y += dir.y;
      for (const b of boxes) {
        mapSet(b.x, b.y, tiles.empty);
        mapSet(b.x + dir.x, b.y + dir.y, tiles.box);
      }
      break;
    } else if (t == tiles.wall) {
      break;
    }
  }
}

let total = 0;

for (let y = 0; y < mapH; y++) {
  for (let x = 0; x < mapW; x++) {
    if (at(x, y) == tiles.box) {
      total += x + 100 * y;
    }
  }
}

console.log(total);
