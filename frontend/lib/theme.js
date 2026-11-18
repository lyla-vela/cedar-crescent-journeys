import { createTheme } from "@mui/material/styles";

// Cedar & Crescent Journeys theme: deep plum/cedar with a gold accent.
export const theme = createTheme({
  palette: {
    primary: { main: "#5E2B4A", dark: "#431E36", light: "#7E4A6B", contrastText: "#FFFFFF" },
    secondary: { main: "#C9A227", dark: "#9C7E1A", light: "#DDBB55", contrastText: "#1A1A1A" },
    background: { default: "#FAF6F3", paper: "#FFFFFF" },
  },
  typography: {
    h1: { fontWeight: 700 },
    h2: { fontWeight: 600 },
  },
});
