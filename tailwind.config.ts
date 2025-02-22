/** @type {import('tailwindcss').Config} */

module.exports = {
    darkMode: ["class"],
    content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
    	screens: {
    		xs: '360px',
    		sm: '480px',
    		md: '768px',
    		lg: '1024px',
    		xl: '1280px',
    		'2xl': '1536px'
    	},
    	container: {
    		center: true,
    		padding: {
    			DEFAULT: '1rem',
    			sm: '1.5rem',
    			lg: '2rem'
    		},
    		screens: {
    			sm: '100%',
    			md: '100%',
    			lg: '100%',
    			xl: '1280px',
    			'2xl': '1400px'
    		}
    	},
    	extend: {
    		colors: {
    			primary: {
    				'50': '#f0f9ff',
    				'100': '#e0f2fe',
    				'200': '#bae6fd',
    				'300': '#7dd3fc',
    				'400': '#38bdf8',
    				'500': '#0ea5e9',
    				'600': '#0284c7',
    				'700': '#0369a1',
    				'800': '#075985',
    				'900': '#0c4a6e',
    				'950': '#082f49'
    			},
    			accent: {
    				'50': '#fdf4ff',
    				'100': '#fae8ff',
    				'200': '#f5d0fe',
    				'300': '#f0abfc',
    				'400': '#e879f9',
    				'500': '#d946ef',
    				'600': '#c026d3',
    				'700': '#a21caf',
    				'800': '#86198f',
    				'900': '#701a75',
    				'950': '#4a044e'
    			},
    			gray: {
    				'50': '#f9fafb',
    				'100': '#f3f4f6',
    				'200': '#e5e7eb',
    				'300': '#d1d5db',
    				'400': '#9ca3af',
    				'500': '#6b7280',
    				'600': '#4b5563',
    				'700': '#374151',
    				'800': '#1f2937',
    				'900': '#111827',
    				'950': '#030712'
    			}
    		},
    		fontFamily: {
    			serif: [
    				'DM Serif Text',
    				'serif'
    			],
    			sans: [
    				'Inter',
    				'sans-serif'
    			]
    		},
    		fontSize: {
    			'2xs': [
    				'0.625rem',
    				{
    					lineHeight: '0.75rem'
    				}
    			],
    			xs: [
    				'0.75rem',
    				{
    					lineHeight: '1rem'
    				}
    			],
    			sm: [
    				'0.875rem',
    				{
    					lineHeight: '1.25rem'
    				}
    			],
    			base: [
    				'1rem',
    				{
    					lineHeight: '1.5rem'
    				}
    			],
    			lg: [
    				'1.125rem',
    				{
    					lineHeight: '1.75rem'
    				}
    			],
    			xl: [
    				'1.25rem',
    				{
    					lineHeight: '1.75rem'
    				}
    			],
    			'2xl': [
    				'1.5rem',
    				{
    					lineHeight: '2rem'
    				}
    			],
    			'3xl': [
    				'1.875rem',
    				{
    					lineHeight: '2.25rem'
    				}
    			],
    			'4xl': [
    				'2.25rem',
    				{
    					lineHeight: '2.5rem'
    				}
    			],
    			'5xl': [
    				'3rem',
    				{
    					lineHeight: '1'
    				}
    			],
    			'6xl': [
    				'3.75rem',
    				{
    					lineHeight: '1'
    				}
    			]
    		},
    		spacing: {
    			'4xs': '0.125rem',
    			'3xs': '0.25rem',
    			'2xs': '0.375rem',
    			xs: '0.5rem',
    			sm: '0.75rem',
    			md: '1rem',
    			lg: '1.25rem',
    			xl: '1.5rem',
    			'2xl': '2rem',
    			'3xl': '2.5rem',
    			'4xl': '3rem'
    		},
    		borderRadius: {
    			none: '0',
    			sm: 'calc(var(--radius) - 4px)',
    			DEFAULT: '0.25rem',
    			md: 'calc(var(--radius) - 2px)',
    			lg: 'var(--radius)',
    			xl: '0.75rem',
    			'2xl': '1rem',
    			'3xl': '1.5rem',
    			full: '9999px'
    		},
    		animation: {
    			'accordion-down': 'accordion-down 0.2s ease-out',
    			'accordion-up': 'accordion-up 0.2s ease-out',
    			'fade-in': 'fade-in 0.2s ease-out',
    			'fade-out': 'fade-out 0.2s ease-out',
    			'slide-in': 'slide-in 0.2s ease-out',
    			'slide-out': 'slide-out 0.2s ease-out'
    		},
    		keyframes: {
    			'accordion-down': {
    				from: {
    					height: '0'
    				},
    				to: {
    					height: 'var(--radix-accordion-content-height)'
    				}
    			},
    			'accordion-up': {
    				from: {
    					height: 'var(--radix-accordion-content-height)'
    				},
    				to: {
    					height: '0'
    				}
    			},
    			'fade-in': {
    				'0%': {
    					opacity: '0'
    				},
    				'100%': {
    					opacity: '1'
    				}
    			},
    			'fade-out': {
    				'0%': {
    					opacity: '1'
    				},
    				'100%': {
    					opacity: '0'
    				}
    			},
    			'slide-in': {
    				'0%': {
    					transform: 'translateY(100%)'
    				},
    				'100%': {
    					transform: 'translateY(0)'
    				}
    			},
    			'slide-out': {
    				'0%': {
    					transform: 'translateY(0)'
    				},
    				'100%': {
    					transform: 'translateY(100%)'
    				}
    			}
    		}
    	}
    },
	safelist: [
		{
			pattern: /^gap-/,
			variants: ["xs", "sm", "md", "lg", "xl", "2xl"],
		},
		{
			pattern: /^flex-/,
			variants: ["xs", "sm", "md", "lg", "xl", "2xl"],
		},
		{
			pattern: /^items-/,
			variants: ["xs", "sm", "md", "lg", "xl", "2xl"],
		},
		{
			pattern: /^justify-/,
			variants: ["xs", "sm", "md", "lg", "xl", "2xl"],
		},
		{
			pattern: /^max-/,
			variants: ["xs", "sm", "md", "lg", "xl", "2xl"],
		},
		{
			pattern: /^px-/,
			variants: ["xs", "sm", "md", "lg", "xl", "2xl"],
		},
		{
			pattern: /^py-/,
			variants: ["xs", "sm", "md", "lg", "xl", "2xl"],
		},
	],
	plugins: [require("tailwindcss-animate")],
};
