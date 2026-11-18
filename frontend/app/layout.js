import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import ThemeRegistry from "./ThemeRegistry.js";

export const metadata = { title: "LAX Travel Packages", description: "Travel packages from LAX to Turkey, Lebanon, Dubai, and destinations around the world." };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <AppBar position="static" color="primary">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Cedar &amp; Crescent Journeys
              </Typography>
              <Button color="inherit" href="/">Home</Button>
              <Button color="inherit" href="/packages">Packages</Button>
              <Button color="inherit" href="/dashboard">Dashboard</Button>
            </Toolbar>
          </AppBar>
          <Container maxWidth="md" sx={{ py: 4 }}>
            <Box>{children}</Box>
          </Container>
        </ThemeRegistry>
      </body>
    </html>
  );
}
