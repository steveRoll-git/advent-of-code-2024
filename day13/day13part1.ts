const machineString =
  /Button A: X\+(\d+), Y\+(\d+)\nButton B: X\+(\d+), Y\+(\d+)\nPrize: X=(\d+), Y=(\d+)/g;

const input = Deno.readTextFileSync("input");

let total = 0;

for (const match of input.matchAll(machineString)) {
  const [_, ax, ay, bx, by, px, py] = match.map((n) => Number(n));
  let bestCost: number | undefined;
  for (let a = 0; a < 100; a++) {
    for (let b = 0; b < 100; b++) {
      const x2 = a * ax + b * bx;
      const y2 = a * ay + b * by;
      if (x2 == px && y2 == py) {
        const cost = 3 * a + b;
        bestCost = bestCost ? Math.min(bestCost, cost) : cost;
      }
    }
  }
  if (bestCost) {
    total += bestCost;
  }
}

console.log(total);
