const input = Deno.readTextFileSync("input");

const space: number[] = [];

{
  let lastID = 0;
  for (const [_, fi, fr] of input.matchAll(/(.)(.?)/g)) {
    const file = Number(fi);
    for (let i = 0; i < file; i++) {
      space.push(lastID);
    }
    lastID++;
    if (fr) {
      const free = Number(fr);
      for (let i = 0; i < free; i++) {
        space.push(-1);
      }
    }
  }
}

for (let i = 0; i < space.length; i++) {
  if (space[i] == -1) {
    while (space[space.length - 1] == -1) {
      space.pop();
    }
    space[i] = space.pop()!;
    while (space[space.length - 1] == -1) {
      space.pop();
    }
  }
}

let total = 0;

for (let i = 0; i < space.length; i++) {
  total += space[i] * i;
}

console.log(total);
