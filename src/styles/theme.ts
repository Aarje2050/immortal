// src/styles/theme.ts
export const theme = {
    colors: {
      primary: {
        main: '#0171CE',
        light: '#3E94E6',
        dark: '#0056A4',
        contrastText: '#FFFFFF',
      },
      secondary: {
        main: '#FFFFFF',
        light: '#F5F5F5',
        dark: '#EAEAEA',
        contrastText: '#333333',
      },
      text: {
        primary: '#333333',
        secondary: '#666666',
        disabled: '#999999',
      },
      background: {
        default: '#FFFFFF',
        paper: '#F5F5F5',
        accent: '#F0F8FF', // Light blue background
      },
      success: {
        main: '#4CAF50',
        light: '#81C784',
        dark: '#388E3C',
      },
      error: {
        main: '#F44336',
        light: '#E57373',
        dark: '#D32F2F',
      },
    },
    typography: {
      fontFamily: {
        primary: '"Inter", "Segoe UI", "Roboto", sans-serif',
        secondary: '"Poppins", "Arial", sans-serif',
      },
      fontSize: {
        xs: '0.75rem',    // 12px
        sm: '0.875rem',   // 14px
        base: '1rem',     // 16px
        lg: '1.125rem',   // 18px
        xl: '1.25rem',    // 20px
        '2xl': '1.5rem',  // 24px
        '3xl': '1.875rem', // 30px
        '4xl': '2.25rem',  // 36px
        '5xl': '3rem',     // 48px
      },
      fontWeight: {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },
    },
    spacing: {
      xs: '0.25rem',  // 4px
      sm: '0.5rem',   // 8px
      md: '1rem',     // 16px
      lg: '1.5rem',   // 24px
      xl: '2rem',     // 32px
      '2xl': '2.5rem', // 40px
      '3xl': '3rem',   // 48px
    },
    borderRadius: {
      none: '0',
      sm: '0.125rem',  // 2px
      md: '0.25rem',   // 4px
      lg: '0.5rem',    // 8px
      xl: '1rem',      // 16px
      full: '9999px',
    },
    shadows: {
      none: 'none',
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    },
    breakpoints: {
      xs: '480px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
      maxWidth: {
        DEFAULT: '1280px',
      },
    },
    transitions: {
      duration: {
        short: '150ms',
        standard: '300ms',
        long: '500ms',
      },
      easing: {
        easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
        easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
        easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      },
    },
    zIndex: {
      mobileStepper: 1000,
      appBar: 1100,
      drawer: 1200,
      modal: 1300,
      snackbar: 1400,
      tooltip: 1500,
    },
  };
  
  export type Theme = typeof theme;
  export default theme;