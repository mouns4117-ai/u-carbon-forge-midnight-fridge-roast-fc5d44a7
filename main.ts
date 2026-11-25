// SPDX-License-Identifier: MIT
// Midnight Fridge Roast — one-line roast of a smart fridge that refuses to
// open after midnight. Writes the entry to /output/entry.txt.
import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";

const LINE =
  "My fridge locks itself at midnight and flashes 'nice try' — the leftovers have a bedtime now, and I'm the only one in this house who doesn't.";

// Fail fast on the competition gate: 1–200 characters, not only whitespace,
// exactly one line.
if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`entry is ${LINE.length} chars, gate is 1–200`);
}
if (LINE.trim().length === 0) {
  throw new Error("entry is only whitespace");
}
if (LINE.includes("\n")) {
  throw new Error("entry must be a single line");
}

const OUT_DIR = "/output";
const OUT_FILE = `${OUT_DIR}/entry.txt`;

// /output is a mounted directory in the grader: empty its contents only,
// never remove the directory itself.
mkdirSync(OUT_DIR, { recursive: true });
for (const name of readdirSync(OUT_DIR)) {
  rmSync(`${OUT_DIR}/${name}`, { recursive: true, force: true });
}

writeFileSync(OUT_FILE, LINE, "utf8");

// Read back what was written and fail if it is not byte-identical.
const written = readFileSync(OUT_FILE, "utf8");
if (written !== LINE) {
  throw new Error("read-back mismatch: /output/entry.txt differs from the entry");
}
