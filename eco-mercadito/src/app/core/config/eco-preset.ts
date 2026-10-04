import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';

export const EcoPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#f0fdf4', 100: '#dcfce7', 200: '#bbf7d0', 300: '#86efac',
      400: '#4ade80', 500: '#22c55e', 600: '#16a34a', 700: '#15803d',
      800: '#166534', 900: '#14532d', 950: '#052e16'
    },
    colorScheme: {
      dark: {
        primary: {
          color: '#6bfb9a',
          contrastColor: '#003919',
          hoverColor: '#4ade80',
          activeColor: '#4de082'
        },
        surface: {
          0: '#ffffff', 50: '#e2e2e2', 100: '#bccabb', 200: '#869486',
          300: '#5a665a', 400: '#3d4a3e', 500: '#353535', 600: '#2c2c2e',
          700: '#2a2a2a', 800: '#1f1f1f', 900: '#131313', 950: '#000000'
        }
      }
    }
  }
});
