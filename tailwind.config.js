/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

export default {
	content: ["./main.js", "./src/**/*.{html,js}", "./index.html"],
	theme: {
		colors: {
			"darkest-green": "#063732",
			"dark-green": "#08453f",
			green: "#008073",
			"light-green": "#E2F3F1",
			"bright-pink": "#f36e86",
			pink: "#f9b8c4",
			"light-pink": "#fde7eb",
			yellow: "#fbcd2a",
			black: "#050f0e",
			white: "#ffffff",
			gray: colors.gray
		},
		fontFamily: {
			sans: ["Lexend", "sans-serif"],
			serif: ["Moret", "serif"]
		},
		extend: {
			keyframes: {
				"subtle-bounce": {
					'0%': {
						transform: 'translateY(0)'
					},
					'50%': {
						transform: 'translateY(0.3rem)'
					},
					'100%': {
						transform: 'translateY(0)'
					},
				}
			},
			animation: {
				"subtle-bounce": "subtle-bounce 2s infinite"
			}
		},
	},
	plugins: [],
}
