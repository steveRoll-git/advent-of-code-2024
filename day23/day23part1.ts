const links = new Map<string, string[]>();

const makeLink = (a: string, b: string) => {
  let list = links.get(a);
  if (list == undefined) {
    list = [];
    links.set(a, list);
  }
  list.push(b);
};

for (
  const [_, a, b] of Deno.readTextFileSync("input").matchAll(/(..)\-(..)/g)
) {
  makeLink(a, b);
  makeLink(b, a);
}

const foundSets = new Set<string>();

let result = 0;

for (const [a, list] of links) {
  for (let i = 0; i < list.length - 1; i++) {
    const b = list[i];
    for (let i2 = i + 1; i2 < list.length; i2++) {
      const c = list[i2];
      if (
        (a.startsWith("t") || b.startsWith("t") || c.startsWith("t")) &&
        !foundSets.has(a + b + c) &&
        links.get(b)!.includes(c)
      ) {
        foundSets.add(a + b + c);
        foundSets.add(a + c + a);
        foundSets.add(b + a + c);
        foundSets.add(b + c + a);
        foundSets.add(c + a + b);
        foundSets.add(c + b + a);
        result++;
      }
    }
  }
}

console.log(result);
