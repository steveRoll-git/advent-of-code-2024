let input = Deno.readTextFileSync("input").split(" ").map((n) => Number(n));

const transform = (arr: number[]) =>
  arr.flatMap((n) => {
    const numDigits = Math.floor(Math.log10(n)) + 1;
    if (n == 0) {
      return 1;
    } else if (numDigits % 2 == 0) {
      return [
        Math.floor(n / (10 ** (numDigits / 2))),
        n % (10 ** (numDigits / 2)),
      ];
    } else {
      return n * 2024;
    }
  });

for (let i = 0; i < 25; i++) {
  input = transform(input);
}

console.log(input.length);
