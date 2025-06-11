/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		// Extend the default Tailwind theme
		extend: {
			colors: {
				"primary-bg": "#fafcff",
				"neutral-lightest": "#f8f9fa",
				"neutral-lighter": "#e9ecef",
				"neutral-light": "#dee2e6",
				neutral: "#ced4da",
				"neutral-dark": "#adb5bd",
				"neutral-darker": "#6c757d",
				"neutral-darkest": "#495057",
				"text-base": "#212529",
			},
			fontFamily: {
				sans: ["Inter", "sans-serif"],
			},
		},
	},
	plugins: [],
};
