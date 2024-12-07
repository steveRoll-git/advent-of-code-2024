const lines = Deno.readTextFileSync("input");

type Operator = (a: number, b: number) => number;

const possibleOperators: Operator[] = [
  (a, b) => a + b,
  (a, b) => a * b,
  (a, b) => Number(`${a}${b}`),
];

const tryOperators = (
  target: number,
  operands: number[],
  operators: Operator[],
) => {
  const lastOperator = operators.length;
  if (lastOperator == operands.length - 1) {
    const total = operands.reduce((p, c, i) => operators[i - 1](p, c));
    return total == target;
  }
  for (const o of possibleOperators) {
    const nextOperators = [...operators, o];
    if (tryOperators(target, operands, nextOperators)) {
      return true;
    }
  }
  return false;
};

let total = 0n;

for (const l of lines.split("\n").filter((l) => l)) {
  const match = l.match(/(\d+): (.+)/)!;
  const target = Number(match[1]);
  const operands = match[2].split(" ").map((n) => Number(n));
  if (tryOperators(target, operands, [])) {
    total += BigInt(target);
  }
}

console.log(total);
