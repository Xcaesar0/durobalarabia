import { build } from 'esbuild';
import { readFile, writeFile } from 'node:fs/promises';
const config = JSON.parse(await readFile(new URL('../config/supabase-public.json', import.meta.url), 'utf8'));
const url = process.env.SUPABASE_URL || config.url;
const key = process.env.SUPABASE_PUBLISHABLE_KEY || config.publishableKey;
if (url && !/^https:\/\/[a-z0-9-]+\.supabase\.co$/.test(url)) throw new Error('Invalid Supabase project URL');
// Never accept a privileged key in a browser bundle.
if (key && !key.startsWith('sb_publishable_')) throw new Error('Use a modern Supabase publishable key, never a secret/service key');
await build({ entryPoints: ['js/admin.js'], bundle: true, minify: true, format: 'esm', target: ['es2022'], outfile: 'assets/admin.js', define: { ADMIN_SUPABASE_URL: JSON.stringify(url), ADMIN_SUPABASE_KEY: JSON.stringify(key) } });
await writeFile('assets/admin.js.LICENSE.txt', 'Supabase JavaScript client: MIT license. https://github.com/supabase/supabase-js/blob/master/LICENSE\n');
console.log(`Admin built; Supabase ${url && key ? 'configured' : 'awaiting project configuration'}.`);
