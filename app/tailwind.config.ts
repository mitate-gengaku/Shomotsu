import type { Config } from 'tailwindcss';

export default {
	darkMode: ['class'],
	content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
  	extend: {
			fontFamily: {
				'geist-sans': 'var(--font-geist-sans)'
			}
  	}
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config