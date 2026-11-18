"use client";
import { useState } from "react";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

// Destination photo for a package card. If the remote image fails to load,
// fall back to a colored MUI placeholder instead of a broken image.
export default function PackagePhoto({ image, height = 200 }) {
  const [failed, setFailed] = useState(false);
  if (!image || failed) {
    return (
      <Box sx={{ height, bgcolor: "secondary.main", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Typography variant="h6" sx={{ color: "secondary.contrastText", px: 2, textAlign: "center" }}>
          {image ? image.alt : "Destination photo unavailable"}
        </Typography>
      </Box>
    );
  }
  return <CardMedia component="img" height={height} image={image.src} alt={image.alt} onError={() => setFailed(true)} />;
}
