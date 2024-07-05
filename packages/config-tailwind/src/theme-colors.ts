/**
 * All the colors used throughout the project should be put here.
 * Note: Use legacy rgb(r, g, b) function since ApexCharts can't use modern rgb(r g b) format.
 *       Make sure that the color variables defined on globals.css is following the comma separated format
 */

const themeColors = {
  primary: {
    DEFAULT: "rgb(var(--color-primary), <alpha-value>)",
    light: "rgb(var(--color-primary-light), <alpha-value>)",
  },
  secondary: {
    DEFAULT: "rgb(var(--color-secondary), <alpha-value>)",
    light: "rgb(var(--color-secondary-light), <alpha-value>)",
    lighter: "rgb(var(--color-secondary-lighter), <alpha-value>)",
  },
  gray: {
    50: "rgb(var(--color-gray-50), <alpha-value>)",
    100: "rgb(var(--color-gray-100), <alpha-value>)",
    200: "rgb(var(--color-gray-200), <alpha-value>)",
    300: "rgb(var(--color-gray-300), <alpha-value>)",
    400: "rgb(var(--color-gray-400), <alpha-value>)",
    500: "rgb(var(--color-gray-500), <alpha-value>)",
    600: "rgb(var(--color-gray-600), <alpha-value>)",
    700: "rgb(var(--color-gray-700), <alpha-value>)",
    800: "rgb(var(--color-gray-800), <alpha-value>)",
    900: "rgb(var(--color-gray-900), <alpha-value>)",
  },
  card: "rgb(var(--color-card), <alpha-value>)",
  white: "rgb(var(--color-white), <alpha-value>)",
  black: "rgb(var(--color-black), <alpha-value>)",
  background: "rgb(var(--color-background), <alpha-value>)",
  error: {
    DEFAULT: "rgb(var(--color-error), <alpha-value>)",
  },
};
export { themeColors };
