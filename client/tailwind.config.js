/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{js,jsx,ts,tsx}',
        'node_modules/flowbite-react/lib/esm/**/*.js',
        './node_modules/flowbite/**/*.js',
    ],

    theme: {
        extend: {
            colors: {
                header: '#FF6609',
                cobalt: '#026597',
            },
            fontFamily: {
                quicksand: ['Quicksand', 'sans-serif'],
            },
            height: {
                32.8: '32.8rem',
                48.6: '48.6rem',
            },
            screens: {
                xs: '480px', // Định nghĩa breakpoint xs
                sm: '640px', // Định nghĩa breakpoint sm
                md: '768px', // Định nghĩa breakpoint md
                lg: '1024px', // Định nghĩa breakpoint lg
                xl: '1280px', // Định nghĩa breakpoint xl
                xxl: '1536px', // Định nghĩa breakpoint xxl
            },
        },
    },
    plugins: [require('flowbite/plugin')],
};
