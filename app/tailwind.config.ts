import type { Config } from 'tailwindcss';

export default {
	darkMode: ['class'],
	content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontFamily: {
  			'geist-sans': 'var(--font-geist-sans)',
				'manrope': 'var(--font-manrope)'
  		},
      typography: (theme) => ({
        pink: {
          css: {
            '--tw-prose-body': theme('colors.pink.700'),
            '--tw-prose-headings': theme('colors.pink.600'),
            '--tw-prose-lead': theme('colors.pink.600'),
            '--tw-prose-links': theme('colors.pink.500'),
            '--tw-prose-bold': theme('colors.pink.900'),
            '--tw-prose-counters': theme('colors.pink.500'),
            '--tw-prose-bullets': theme('colors.pink.300'),
            '--tw-prose-hr': theme('colors.pink.200'),
            '--tw-prose-quotes': theme('colors.pink.900'),
            '--tw-prose-quote-borders': theme('colors.pink.200'),
            '--tw-prose-captions': theme('colors.pink.500'),
            '--tw-prose-code': theme('colors.pink.900'),
            '--tw-prose-pre-code': theme('colors.pink.100'),
            '--tw-prose-pre-bg': theme('colors.pink.900'),
            '--tw-prose-th-borders': theme('colors.pink.300'),
            '--tw-prose-td-borders': theme('colors.pink.200'),

						// invert
            '--tw-prose-invert-body': theme('colors.pink.500'),
            '--tw-prose-invert-headings': theme('colors.pink.500'),
            '--tw-prose-invert-lead': theme('colors.pink.500'),
            '--tw-prose-invert-links': theme('colors.pink.500'),
            '--tw-prose-invert-bold': theme('colors.pink.500'),
            '--tw-prose-invert-counters': theme('colors.pink.500'),
            '--tw-prose-invert-bullets': theme('colors.pink.700'),
            '--tw-prose-invert-hr': theme('colors.pink.800'),
            '--tw-prose-invert-quotes': theme('colors.pink.500'),
            '--tw-prose-invert-quote-borders': theme('colors.pink.800'),
            '--tw-prose-invert-captions': theme('colors.pink.500'),
            '--tw-prose-invert-code': theme('colors.pink.500'),
            '--tw-prose-invert-pre-code': theme('colors.pink.500'),
            '--tw-prose-invert-pre-bg': theme('colors.pink.950'),
            '--tw-prose-invert-th-borders': theme('colors.pink.700'),
            '--tw-prose-invert-td-borders': theme('colors.pink.800'),
          },
        },
      }),
  	}
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
} satisfies Config