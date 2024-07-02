import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/flowbite-react/lib/**/*.js",

  ],
  theme: {
    extend: {
      colors: {
        white: "#fff",
        gainsboro: {
          "100": "#e0e0e0",
          "200": "#e0d7d7",
          "300": "#d9d9d9",
        },
        gray: {
          "100": "#828282",
          "200": "#1c1818",
          "300": "#0a0303",
        },
        black: "#000",
        whitesmoke: "#eee",
        lightgray: "#d4d4d4",
        darkgreen: "#216a0f",
        silver: "#c1c1c1",
        darkslategray: "#362e2e",
      },
      spacing: {},
      fontFamily: {
        "small-text": "Inter",
      },
      borderRadius: {
        "981xl": "1000px",
      },
    },
    fontSize: {
      base: "16px",
      xs: "12px",
      "3xs": "10px",
      "9xl": "28px",
      inherit: "inherit",
    },
    screens: {
      mq1100: {
        raw: "screen and (max-width: 1100px)",
      },
      mq1025: {
        raw: "screen and (max-width: 1025px)",
      },
      mq750: {
        raw: "screen and (max-width: 750px)",
      },
      mq450: {
        raw: "screen and (max-width: 450px)",
      },
      mq675: {
        raw: "screen and (max-width: 675px)",
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
}
export default config
