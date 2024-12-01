import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			fontFamily: {
				serif: ['Playfair Display', 'serif'],
				sans: ['Cabin', 'sans-serif'],
				mono: ['Courier Prime', 'monospace']
			},
			backgroundImage: () => {
				return {
					tile: "url('/Tile32.png')"
				};
			}
		}
	},

	plugins: []
} satisfies Config;
