import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/(routes)/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
      },
      screens: {
        xs: "320px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      boxShadow: {
        "top-shadow":
          "0 -10px 15px -3px rgba(0, 0, 0, 0.1), 0 -4px 6px -4px rgba(0, 0, 0, 0.1)",
        // Custom box-shadow you mentioned
        "card-shadow": "0 10px 20px rgba(0, 0, 0, 0.2)",
      },
      scale: {
        "150": "1.5", // Adds scale 1.5 as a custom scale value
        "165": "1.65", // Adds scale 1.65 as a custom scale value
      },
      transitionDuration: {
        "1500": "1500ms", // Adds custom transition duration of 1.5s
      },
       animation: {
        slideUp: 'slideUp 1s ease-out forwards',
        slideRight: 'slideRight 1s ease-out forwards',
        fadeIn: 'fadeIn 0.8s ease-out forwards',
      },
      keyframes: {
        slideUp: {
          '0%': {
            transform: 'translateY(100%) rotate(0deg)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateY(0) rotate(-5deg)',
            opacity: '1',
          },
        },
        slideRight: {
          '0%': {
            transform: 'translateX(0) translateY(0) rotate(-30deg)',
            opacity: '1',
          },
          '100%': {
            transform: 'translateX(100%) translateY(-100%)',
            opacity: '0',
          },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(90px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    // Keep the forms plugin
    function ({
      addUtilities,
    }: {
      addUtilities: (
        utilities: Record<string, any>,
        variants: string[]
      ) => void;
    }) {
      const newUtilities = {
        ".scrollbar-thin": {
          scrollbarWidth: "thin",
          scrollbarColor: "lightGrey white",
        },
        ".scrollbar-webkit": {
          "&::-webkit-scrollbar": {
            width: "1px",
          },
          "&::-webkit-scrollbar-track": {
            background: "white",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgb(31 41 55)",
            borderRadius: "20px",
            border: "1px solid white",
          },
        },
        // Add styles for other browsers if needed
      };

      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
} satisfies Config;
