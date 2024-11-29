import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import {execSync} from 'node:child_process';

import pkg from './package.json' with { type: 'json' };
const commitHash = execSync("git rev-parse --short HEAD").toString().trim();

export default defineConfig({
	plugins: [sveltekit()],
	define: {
		__VERSION__: JSON.stringify(pkg.version),
		__COMMIT__: JSON.stringify(commitHash)
	}
});
