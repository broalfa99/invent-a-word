// Invent a Word We Need — a make.fun bounty entry.
// Coins one new English word and defines it in a single clear line
// (1–140 characters), written to /output/entry.txt.
//
// Candidates judged against the judge's brief (fills a real gap a
// reader recognises at once; definition lands in one reading;
// sayable, spellable, memorable; fresh and surprising):
//
//  1. tabnesia — opening a browser tab and forgetting why you opened it.
//  2. chargxiety — the low-grade panic as your phone battery slides below ten percent.
//  3. doorwaylag — the blank moment when you walk into a room and forget why you came.
//  4. pocketbuzz — the phantom buzz you feel from a phone that never vibrated.
//  5. snackcident — accidentally finishing the whole bag while insisting you only wanted one.
//  6. fridgepeek — opening the fridge for the third time, hoping something new appeared.
//  7. goodbyeloop — the endless round of "okay, bye" that keeps a goodbye going for ten minutes.
//  8. namefog — the fog that swallows a name the second you need to say it.
//  9. scrollhole — the lost hour you fall into when you meant to check one notification.
// 10. queuecreep — inching forward in a line as if the extra step will make it move faster.
// 11. replydraft — the message you typed, deleted, and retyped three times before sending nothing.
// 12. meetlag — the silence after "you're on mute" when everyone starts talking at once.
//
// Why #1 wins: every browser user has lived it and English has no
// word for it; "tab" + "amnesia" fuses cleanly into something
// sayable, spellable and memorable that sounds as though English
// grew it; the definition is exact and self-contained — the meaning
// lands in one reading, no example needed.

import { mkdirSync, writeFileSync } from "node:fs";

const ENTRY =
  "tabnesia — opening a browser tab and forgetting why you opened it.";

const MAX_CHARS = 140;
const DEFAULT_OUTPUT_PATH = "/output/entry.txt";

function resolveOutputPath(argv: string[]): string {
  // First argument, if given, is where to write; otherwise the
  // competition's fixed path. An argument ending in .txt is a file;
  // anything else is a directory (created if needed) holding
  // entry.txt, so `node main.ts /tmp/out` works even when /tmp/out
  // does not exist yet.
  if (argv.length < 3) return DEFAULT_OUTPUT_PATH;
  const target = argv[2];
  if (target.endsWith(".txt")) return target;
  return `${target}/entry.txt`;
}

function main(): void {
  const line = ENTRY.trim();
  if (!line) throw new Error("entry line is empty");
  if (line.length > MAX_CHARS) {
    throw new Error(
      `entry line is ${line.length} characters, over the ${MAX_CHARS} limit`,
    );
  }
  if (line.includes("\n")) throw new Error("entry must be a single line");
  // Verified locally: 66 characters, one line, UTF-8, not only whitespace.
  const path = resolveOutputPath(process.argv);
  mkdirSync(path.slice(0, path.lastIndexOf("/")) || ".", { recursive: true });
  writeFileSync(path, line, "utf8");
  console.log(`Wrote ${line.length} characters to ${path}`);
}

main();
