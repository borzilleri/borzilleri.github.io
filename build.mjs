#!/usr/bin/env node
// Renders data/site.json + src/template.html into dist/, inlining icon SVGs.
import { readFile, writeFile, mkdir, copyFile } from 'node:fs/promises';

const read = (p) => readFile(new URL(p, import.meta.url), 'utf8');

const escapeHtml = (s) =>
  s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

const renderLink = async ({ type, label, url }) => {
  const icon = (await read(`src/icons/${type}.svg`)).trim();
  const external = /^https?:/.test(url) ? ' target="_blank" rel="me noopener noreferrer"' : '';
  return `    <a class="link link-${escapeHtml(type)}" href="${escapeHtml(url)}"${external}>${icon}${escapeHtml(label)}</a>`;
};

const site = JSON.parse(await read('data/site.json'));
const links = (await Promise.all(site.links.map(renderLink))).join('\n');

const html = (await read('src/template.html'))
  .replace('{{title}}', escapeHtml(site.title))
  .replace('{{name}}', escapeHtml(site.name))
  .replace('{{footer}}', escapeHtml(site.footer))
  .replace('{{links}}', links);

const dist = new URL('dist/', import.meta.url);
await mkdir(dist, { recursive: true });
await writeFile(new URL('index.html', dist), html);
for (const css of ['theme.css', 'style.css']) {
  await copyFile(new URL(`src/${css}`, import.meta.url), new URL(css, dist));
}
console.log(`Built dist/ with ${site.links.length} links.`);
