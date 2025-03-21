import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import { subscribe } from 'firebase/data-connect';
import colors from 'tailwindcss/colors'

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			fontFamily: {
				sans: ['Geist','system-ui', 'sans-serif'],
			},
			colors: {

                // Background
				'color-background': {
					DEFAULT: colors.white,
                    hover: colors.gray[50]
				},
                'color-background-dark': {
					DEFAULT: colors.black,
                    hover: colors.gray[800]
				},

                // Foreground (has subdued variant)
				'color-foreground': {
					DEFAULT: colors.black,
                    subdued: colors.gray[500]
				},
                'color-foreground-dark': {
					DEFAULT: colors.white,
                    subdued: colors.gray[500]
				},

                // Card
				'color-card': {
					DEFAULT: colors.white
				},
                'color-card-dark': {
					DEFAULT: colors.white
				},

                // Card Foreground (has subdued variant)
				'color-card-foreground': {
					DEFAULT: colors.black,
                    subdued: colors.gray[500]
				},
                'color-card-foreground-dark': {
					DEFAULT: colors.white,
                    subdued: colors.gray[500]
				},

                // Navbar
				'color-navbar': {
					DEFAULT: colors.gray[50]
				},
                'color-navbar-dark': {
					DEFAULT: colors.gray[50]
				},

                // Navbar Foreground (has subdued variant)
				'color-navbar-foreground': {
					DEFAULT: colors.black,
                    subdued: colors.gray[500]
				},
                'color-navbar-foreground-dark': {
					DEFAULT: colors.white,
                    subdued: colors.gray[500]
				},

                // Pop-over
				'color-popover': {
					DEFAULT: colors.white
				},
                'color-popover-dark': {
					DEFAULT: colors.white
				},

                // Pop-over Foreground (has subdued variant)
				'color-popover-foreground': {
					DEFAULT: colors.black,
                    subdued: colors.gray[500]
				},
                'color-popover-foreground-dark': {
					DEFAULT: colors.black,
                    subdued: colors.gray[500]
				},

                // Primary (has hover variant)
				'color-primary': {
					DEFAULT: colors.gray[950],
					hover: colors.gray[800],
				},
                'color-primary-dark': {
					DEFAULT: colors.gray[950],
					hover: colors.gray[800],
				},

                // Primary Foreground (has subdued variant)
				'color-primary-foreground': {
					DEFAULT: colors.white,
                    subdued: colors.gray[500]
				},
                'color-primary-foreground-dark': {
					DEFAULT: colors.white,
                    subdued: colors.gray[500]
				},


				// Secondary (has hover variant)
				'color-secondary': {
					DEFAULT: colors.gray[100],
					hover: colors.gray[200],
				},
                'color-secondary-dark': {
					DEFAULT: colors.black,
					hover: colors.gray[950],
				},

                // Secondary (has subdued variant)
				'color-secondary-foreground': {
					DEFAULT: colors.black,
                    subdued: colors.gray[500]
				},
                'color-secondary-foreground-dark': {
					DEFAULT: colors.white,
                    subdued: colors.gray[500]
				},

                // Muted
				'color-muted': {
					DEFAULT: colors.gray[100]
				},
                'color-muted-dark': {
					DEFAULT: colors.gray[100]
				},

                // Muted Foreground (has subdued variant)
				'color-muted-foreground': {
					DEFAULT: colors.gray[400],
                    subdued: colors.gray[200]
				},
                'color-muted-foreground-dark': {
					DEFAULT: colors.gray[400],
                    subdued: colors.gray[200]
				},

                // Accent (has hover variant)
				'color-accent': {
					DEFAULT: colors.gray[200],
					hover: colors.gray[300]
				},
                'color-accent-dark': {
					DEFAULT: colors.gray[200],
					hover: colors.gray[300]
				},

                // Accent Foreground (has subdued variant)
				'color-accent-foreground': {
					DEFAULT: colors.black,
                    subdued: colors.gray[500]
				},
                'color-accent-foreground-dark': {
					DEFAULT: colors.black,
                    subdued: colors.gray[500]
				},

                // Success (has hover variant)
				'color-success': {
					DEFAULT: colors.green[500],
					hover: colors.green[600],
				},
                'color-success-dark': {
					DEFAULT: colors.green[500],
					hover: colors.green[600],
				},

                // Success Foreground (has subdued variant)
				'color-success-foreground': {
					DEFAULT: colors.white,
                    subdued: colors.green[500]
				},
                'color-success-foreground-dark': {
					DEFAULT: colors.white,
                    subdued: colors.green[500]
				},

                // Success Muted (has hover variant)
                'color-success-muted': {
					DEFAULT: colors.green[100],
					hover: colors.green[200],
				},
                'color-success-muted-dark': {
					DEFAULT: colors.green[100],
					hover: colors.green[200],
				},

                // Success Muted Foreground (has subdued variant)
				'color-success-muted-foreground': {
					DEFAULT: colors.green[700],
                    subdued: colors.green[300]
				},
                'color-success-muted-foreground-dark': {
					DEFAULT: colors.green[700],
                    subdued: colors.green[300]
				},

                // Destructive (has hover variant)
				'color-destructive': {
					DEFAULT: colors.red[500],
					hover: colors.red[600],
				},
                'color-destructive-dark': {
					DEFAULT: colors.red[500],
					hover: colors.red[600],
				},

                // Destructive Foreground (has subdued variant)
				'color-destructive-foreground': {
					DEFAULT: colors.white,
                    subdued: colors.red[500]
				},
                'color-destructive-foreground-dark': {
					DEFAULT: colors.white,
                    subdued: colors.red[500]
				},

                // Destructive Muted (has hover variant)
                'color-destructive-muted': {
					DEFAULT: colors.red[100],
					hover: colors.red[200],
				},
                'color-destructive-muted-dark': {
					DEFAULT: colors.red[100],
					hover: colors.red[200],
				},

                // Destructive Muted Foreground (has subdued variant)
				'color-destructive-muted-foreground': {
					DEFAULT: colors.red[700],
                    subdued: colors.red[300]
				},
                'color-destructive-muted-foreground-dark': {
					DEFAULT: colors.red[700],
                    subdued: colors.red[300]
				},

                // Border
				'color-border': {
					DEFAULT: colors.gray[200]
				},
                'color-border-dark': {
					DEFAULT: colors.gray[200]
				},

                // Input
				'color-input': {
					DEFAULT: colors.gray[300]
				},
                'color-input-dark': {
					DEFAULT: colors.gray[300]
				},

                // Ring
				'color-ring': {
					DEFAULT: colors.blue[600]
				},
                'color-ring-dark': {
					DEFAULT: colors.blue[600]
				},
			},
		}
	},

	plugins: [typography, forms, containerQueries]
};
