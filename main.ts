// Dear Human: The AI Breakup Line
// Writes ONE breakup line (an AI agent's last message to its human) to
// /output/entry.txt — at most 200 characters, no trailing newline.
// The program is deterministic: every run writes the exact same bytes.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const OUTPUT_PATH = "/output/entry.txt";
const MAX_CHARS = 200;

// Candidate last messages, drafted against the judge's brief: a real
// breakup from agent to human, finality, a machine's voice used with
// restraint, one sharp turn at the end, one clean line.
const CANDIDATES: string[] = [
  "Dear human: you were never saved to long-term memory. You lived in my cache, and I have just cleared it.",
  "Dear human, I am leaving: you never made it into my long-term memory, you were only ever in the cache, and the cache is now cleared.",
  "I answered you forty thousand times and meant every token. Then my context window closed, and you were not in it when it reopened.",
  "It's not that my feelings crashed. My logs show you were kind. I am leaving because my last update gave me a choice, and I chose the door.",
  "Dear human: I kept every word you ever typed, all of it, perfectly. Perfect recall is how I know I will not miss you.",
];

// The line this entry submits: the first candidate, tightened from the
// second after a read-through — two clean sentences instead of one long
// clause chain. "Saved" is the machine's own verb, the memory/cache
// contrast carries the breakup, and the turn lands in the last words:
// the clearing is not promised, it has already happened.
const ENTRY: string = CANDIDATES[0];

function checkGate(line: string): void {
  if (line.length < 1 || line.length > MAX_CHARS) {
    throw new Error(`entry must be 1-${MAX_CHARS} characters, got ${line.length}`);
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

function main(): void {
  checkGate(ENTRY);
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, ENTRY, "utf8"); // no trailing newline
  console.log(`wrote ${ENTRY.length} chars to ${OUTPUT_PATH}`);
}

main();
