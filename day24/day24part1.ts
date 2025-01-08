const [inputs, gates] = Deno.readTextFileSync("input").split("\n\n");

type Gate = (a: boolean, b: boolean) => boolean;

const gateTypes: Record<string, Gate> = {
  AND: (a, b) => a && b,
  OR: (a, b) => a || b,
  XOR: (a, b) => a != b,
};

const wires = new Map<string, { a: string; b: string; gate: Gate } | boolean>();

for (const [_, wire, value] of inputs.matchAll(/(...): (\d)/g)) {
  wires.set(wire, value == "1");
}

let maxZ = 0;

for (
  const [_, a, op, b, out] of gates.matchAll(/(...) (...?) (...) -> (...)/g)
) {
  wires.set(out, { a, b, gate: gateTypes[op] });
  if (out.startsWith("z")) {
    maxZ = Math.max(maxZ, Number(out.match(/\d+/)![0]));
  }
}

const cache = new Map<string, boolean>();

const evalWire = (wire: string) => {
  const cached = cache.get(wire);
  if (cached !== undefined) {
    return cached;
  }
  let value = wires.get(wire)!;
  if (typeof value == "boolean") {
    return value;
  } else {
    const a = evalWire(value.a);
    const b = evalWire(value.b);
    value = value.gate(a, b);
    cache.set(wire, value);
    return value;
  }
};

let result = 0;

for (let i = 0; i <= maxZ; i++) {
  const bit = evalWire(`z${String(i).padStart(2, "0")}`);
  if (bit) {
    result += 2 ** i;
  }
}

console.log(result);
