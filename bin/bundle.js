#!/usr/bin/env node

const path = require("path");
const fs = require("fs-extra");
const glob = require("glob-promise");

let critical;

try {
  critical = require("critical");
} catch (e) {}

const outDir = path.resolve(__dirname, "../out");
const staticDir = path.resolve(__dirname, "../.next/static");

function generate(src, filename) {
  return critical.generate({
    base: outDir,
    src,
    dest: path.join(path.dirname(src), filename),
    inline: true,
    extract: false,
    minify: true,
    inlineImages: false,
    penthouse: {
      blockJSRequests: false
    }
  });
}

async function main() {
  console.log("Copying static files to output directory...");

  await fs.copy(staticDir, path.join(outDir, "static"));

  if (critical) {
    for (const index of await glob("**/index.html", { cwd: outDir })) {
      console.log("Genetating critical path files for " + index + "...");
      await generate(index, "index.html");
    }
  } else {
    console.warn(
      'WARNING: Run "npm install critical" to enable critical CSS injecting'
    );
  }
}

main();
