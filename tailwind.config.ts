import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#fff1e9',
                secondary: '#121212',
                accent: '#ff5e00',
                border: '#f3f4f6'
            },
            keyframes: {
                underlineAnimationExpand: {
                    from: { transform: 'scaleX(0%)', },
                    to: { transform: 'scaleX(100%)', },
                },
                underlineAnimationRetract: {
                    from: { transform: 'scaleX(100%)', },
                    to: { transform: 'scaleX(0%)', },
                },
                slideDownAndFade: {
                    from: { opacity: '0', transform: 'translateY(-2px)' },
                    to: { opacity: '1', transform: 'translateY(0)' },
                },
                slideLeftAndFade: {
                    from: { opacity: '0', transform: 'translateX(2px)' },
                    to: { opacity: '1', transform: 'translateX(0)' },
                },
                slideUpAndFade: {
                    from: { opacity: '0', transform: 'translateY(2px)' },
                    to: { opacity: '1', transform: 'translateY(0)' },
                },
                slideRightAndFade: {
                    from: { opacity: '0', transform: 'translateX(-2px)' },
                    to: { opacity: '1', transform: 'translateX(0)' },
                },
            },
            animation: {
                slideDownAndFade: 'slideDownAndFade 500ms cubic-bezier(0.16, 1, 0.3, 1)',
                slideLeftAndFade: 'slideLeftAndFade 500ms cubic-bezier(0.16, 1, 0.3, 1)',
                slideUpAndFade: 'slideUpAndFade 500ms cubic-bezier(0.16, 1, 0.3, 1)',
                slideRightAndFade: 'slideRightAndFade 500ms cubic-bezier(0.16, 1, 0.3, 1)',
                underlineAnimationExpand: 'underlineAnimationExpand 500ms cubic-bezier(0.16, 1, 0.3, 1)',
                underlineAnimationRetract: 'underlineAnimationRetract 500ms cubic-bezier(0.16, 1, 0.3, 1)',
            },
        },
    },
    plugins: [],
};
export default config;
