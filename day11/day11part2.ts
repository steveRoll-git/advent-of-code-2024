const input = Deno.readTextFileSync("input").split(" ").map((n) => Number(n));

const limit = 75;

const cache = new Map<string, number>();

const getLength = (n: number, i: number, depth: number): number => {
  if (i == depth) {
    return 1;
  }
  const numDigits = Math.floor(Math.log10(n)) + 1;
  const key = `${n} ${i}`;
  let result = cache.get(key);
  if (result) {
    return result;
  }
  if (n == 0) {
    result = getLength(1, i + 1, depth);
  } else if (numDigits % 2 == 0) {
    result = getLength(Math.floor(n / (10 ** (numDigits / 2))), i + 1, depth) +
      getLength(n % (10 ** (numDigits / 2)), i + 1, depth);
  } else {
    result = getLength(n * 2024, i + 1, depth);
  }
  cache.set(key, result);
  return result;
};

let total = 0;

for (const n of input) {
  total += getLength(n, 0, limit);
}

console.log(total);
