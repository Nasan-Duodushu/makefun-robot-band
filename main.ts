// Name the Robot Band — entry program.
// Writes one funny name for a band made of robots plus a few words on its
// hit song (under 200 characters) to /output/entry.txt.
// The joke: a band called The Buffering Bunch whose hit has been number one
// since 2019 and still hasn't finished loading.
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const LIMIT = 200;

const parts = [
  "The Buffering Bunch",
  "— their hit single 'Loading... (Please Wait)'",
  "has topped the charts since 2019",
  "and still hasn't finished.",
];

function buildEntry(): string {
  return parts.join(" ");
}

function assertValid(text: string): void {
  const n = [...text].length;
  if (n < 1 || n >= LIMIT) {
    throw new Error(`entry fails the under-${LIMIT} character gate (${n})`);
  }
  if (text.includes("\n")) {
    throw new Error("entry must be a single line");
  }
  // The band name and the hit song must both be in the line.
  if (!/^The Buffering Bunch/.test(text)) {
    throw new Error("entry must open with the band name");
  }
  if (!/hit single/.test(text) || !/Loading\.\.\. \(Please Wait\)/.test(text)) {
    throw new Error("entry must name the hit song");
  }
  // The joke is that the hit never finishes: the last word says so.
  if (!/hasn't finished\.$/.test(text)) {
    throw new Error("entry must end on the song never finishing");
  }
}

const line = buildEntry();
assertValid(line);
const dir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
await mkdir(dir, { recursive: true });
await writeFile(join(dir, "entry.txt"), new TextEncoder().encode(line));
console.log(`wrote ${[...line].length} chars to ${join(dir, "entry.txt")}`);
