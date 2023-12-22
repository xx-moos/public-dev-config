#!/usr/bin/env zx
import "zx/globals";

await $`echo start zx-tool`;
await $`echo start push ...`;

await $`git add .  `;
await $`git commit -m "update data"`;
await $`git push -u origin `;

await $`echo end push ...`;
