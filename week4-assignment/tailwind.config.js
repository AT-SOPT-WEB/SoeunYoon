/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#EDF4FF',
        black: '#222222',

        // 회색조
        normalGray: '#d9d9d9',
        'normalGray-hover': '#c3c3c3',
        'normalGray-active': '#aeaeae',
        lightGray: '#fbfbfb',
        'lightGray-hover': '#f7f7f7',
        'lightGray-active': '#f3f3f3',
        darkGray: '#a3a3a3',
        'darkGray-hover': '#828282',
        'darkGray-active': '#626262',
        darkerGray: '#4b4b4b',

        // 하늘색~남색
        lightSky: "#DFECFB",
        'lightSky-hover': '#D7E6FD',
        'lightSky-active': '#CFE4FF',
        normalSky: '#AFCDFB',
        'normalSky-hover': '#9EC1F8',
        'normalSky-active': '#8CB3F1',
        darkSky: '#5C90E1',          
        'darkSky-hover': '#4B81D6',       
        'darkSky-active': '#3D70C5',    
      },

      boxShadow: {
        card: '2px 4px 12px 0px rgba(0, 0, 0, 0.08)',
        modal: '2px 2px 16px 0px rgba(0, 0, 0, 0.25)',
      },
      gridAutoColumns: {
        '2fr': 'minmax(0, 2fr)',
        '3fr': 'minmax(0, 3fr)',
      },
      height: {
        inherit: 'inherit',
      },
    },

    keyframes: {
      'slide-fade-in': {
        '0%': {
          opacity: '0',
          transform: 'translateY(-20px)',
        },
        '100%': {
          opacity: '1',
          transform: 'translateY(0)',
        },
      },
    },
    animation: {
      'slide-fade-in': 'slide-fade-in 0.4s ease-out forwards',
    },
  },
  plugins: [],
};