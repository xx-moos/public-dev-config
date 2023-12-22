#!/usr/bin/env zx
import "zx/globals";

await $`echo start zx-tool`;
await $`echo start push ...`;

await $`git add .  `;
await $`git commit -m "update data"`;
await $`git push"`;

await $`echo end push ...`;
