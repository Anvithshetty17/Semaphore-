/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			fontFamily: {
				dosisRegular: ['dosis-regular', 'sans-serif'],
				dosisLight: ['dosis-light', 'sans-serif'],
				dosisBold: ['dosis-bold', 'sans-serif'],
				dosisMedium: ['dosis-medium', 'sans-serif'],
				funkrocker: ['funkrocker', 'sans-serif'],
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
				tertiary: {
					DEFAULT: 'hsl(var(--tertiary))',
					foreground: 'hsl(var(--tertiary-foreground))'
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
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			// 👇 Added glitch animations
			keyframes: {
				glitch1: {
					'0%, 100%': { clip: 'rect(0, 9999px, 0, 0)' },
					'10%': { clip: 'rect(10px, 9999px, 40px, 0)' },
					'20%': { clip: 'rect(20px, 9999px, 60px, 0)' },
					'30%': { clip: 'rect(40px, 9999px, 20px, 0)' },
				},
				glitch2: {
					'0%, 100%': { clip: 'rect(30px, 9999px, 80px, 0)' },
					'15%': { clip: 'rect(5px, 9999px, 60px, 0)' },
					'25%': { clip: 'rect(15px, 9999px, 40px, 0)' },
					'50%': { clip: 'rect(0, 9999px, 20px, 0)' },
				},
			},
			animation: {
				glitch1: 'glitch1 2s infinite linear alternate-reverse',
				glitch2: 'glitch2 2s infinite linear alternate-reverse',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
};
