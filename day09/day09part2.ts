const input = Deno.readTextFileSync("input");

const space: number[] = [];
const freeSpaces: { from: number; to: number }[] = [];
const files: { id: number; from: number; to: number }[] = [];

{
  let lastID = 0;
  for (const [_, fi, fr] of input.matchAll(/(.)(.?)/g)) {
    const file = Number(fi);
    files.push({ id: lastID, from: space.length, to: space.length + file });
    for (let i = 0; i < file; i++) {
      space.push(lastID);
    }
    lastID++;
    if (fr) {
      const free = Number(fr);
      freeSpaces.push({ from: space.length, to: space.length + free });
      for (let i = 0; i < free; i++) {
        space.push(-1);
      }
    }
  }
}

for (let i = files.length - 1; i >= 0; i--) {
  const file = files[i];
  for (let j = 0; j < freeSpaces.length; j++) {
    const free = freeSpaces[j];
    if (free.from > file.from) {
      break;
    }
    if (free.to - free.from >= file.to - file.from) {
      for (let k = file.from; k < file.to; k++) {
        space[k] = -1;
      }
      for (
        let k = free.from;
        k < (free.from + (file.to - file.from));
        k++
      ) {
        space[k] = file.id;
      }
      free.from += file.to - file.from;
      if (free.from >= free.to) {
        freeSpaces.splice(j, 1);
      }
      break;
    }
  }
}

let total = 0;

for (let i = 0; i < space.length; i++) {
  if (space[i] != -1) {
    total += space[i] * i;
  }
}

console.log(total);
