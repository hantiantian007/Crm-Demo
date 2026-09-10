export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        menuBg: '#2A2F3E',
        menuHover: '#373D4E',
        menuActive: '#d1a84f',
        menuText: '#A1A5B7',
        topBarBg: '#FFFFFF',
        mainBg: '#F3F4F6',
        primaryBtn: '#d1a84f',
        primaryBtnHover: '#b89241',
        tableHeader: '#f9fafb',
        // Dark theme colors for login/register
        bgDark: '#1E2126',
        panelDark: '#2D3036',
        inputBg: '#3B3E45',
        brandYellow: '#FCD574',
        brandYellowHover: '#E5C065',
        textMuted: '#9CA3AF'
      }
    },
  },
  plugins: [],
}