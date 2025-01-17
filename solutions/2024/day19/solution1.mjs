import fs from "fs";
import path from "path";
import Trie from "./trie.mjs";

const lines = fs
  .readFileSync(path.join(import.meta.dirname, "input.txt"))
  .toString()
  .trim()
  .split("\n")
  .map((line) => line.trim());
const patterns = lines[0].split(",").map((part) => part.trim());
const trie = new Trie();

patterns.forEach((pattern) => trie.add(pattern));

const result = lines.slice(2).filter((line) => trie.find(line)).length;
console.log(result);
