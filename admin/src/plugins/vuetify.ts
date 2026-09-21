/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com
 */

import "@mdi/font/css/materialdesignicons.css";
import { createVuetify } from "vuetify";
import "vuetify/styles";

const colors = {
  primary: "#fc7400",
  secondary: "#6ee189",
  success: "#07bc0c",
  warning: "#f1c40f",
  error: "#ff0000",
  info: "#3498db;",
};

export default createVuetify({
  theme: {
    defaultTheme: "system", //'system',
    utilities: true,
    transition: true, // default origin: top center
    // or provide options:
    themes: {
      dark: {
        colors,
      },
      light: {
        colors,
      },
    },
  },
  display: {
    mobileBreakpoint: "md",
    thresholds: {
      xs: 0,
      sm: 600,
      md: 840,
      lg: 1145,
      xl: 1545,
      xxl: 2138,
    },
  },
  defaults: {
    VBtn: {
      variant: "outlined",
    },
    VTextField: {
      variant: "outlined",
      density: "compact",
    },
  },
});
