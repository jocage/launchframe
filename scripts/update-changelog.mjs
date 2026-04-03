#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'node:fs';

const [version, rawChangelog] = process.argv.slice(2);
if (!version || !rawChangelog) {
  console.error('Usage: node update-changelog.mjs <version> <changelog>');
  process.exit(1);
}

const file = 'apps/docs/content/docs/changelog.mdx';
const content = readFileSync(file, 'utf8');

const date = new Date().toISOString().slice(0, 10);
const entry = [
  `## v${version}`,
  '',
  `Published to npm as \`create-launchframe@${version}\` on ${date}.`,
  '',
  rawChangelog.trim(),
  '',
].join('\n');

const marker = '\n## v';
const idx = content.indexOf(marker);
if (idx === -1) {
  console.error('Could not find insertion point in changelog.mdx');
  process.exit(1);
}

const updated = content.slice(0, idx) + '\n' + entry + '\n' + content.slice(idx + 1);
writeFileSync(file, updated, 'utf8');
console.log(`Prepended v${version} entry to ${file}`);
