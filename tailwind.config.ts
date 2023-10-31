/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        text_LM: '#1d1602',
        background_LM: '#fffaeb',
        primary_LM: '#ff8400',
        secondary_LM: '#e3d7b5',
        accent_LM: '#cf4307',
        text_DM: '#fdf6e2',
        background_DM: '#161512',
        primary_DM: '#ff8400',
        secondary_DM: '#4a3e1c',
        accent_DM: '#f86c30',
      },
    },
  },
  plugins: [],
};
