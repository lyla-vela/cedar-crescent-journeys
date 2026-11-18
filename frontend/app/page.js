import { getPackages } from "../lib/api.js";
import { formatDate, countBy } from "../lib/format.js";
import { packageImage } from "../lib/images.js";
import PackagePhoto from "./PackagePhoto.js";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";

export default async function Home() {
  const packages = await getPackages();
  const byCountry = countBy(packages, (p) => p.country);
  const byDestination = countBy(packages, (p) => p.destination);
  return (
    <main>
      <Typography variant="h3" component="h1" color="primary" gutterBottom>
        Travel Packages from LAX
      </Typography>
      <Typography variant="body1" paragraph>
        Travel packages from Los Angeles (LAX) to destinations around the world — including Turkey, Lebanon, and Dubai.
      </Typography>

      <Typography variant="h6" gutterBottom>Packages by country</Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 1 }}>
        {byCountry.map(([label, count]) => (
          <Chip key={label} label={`${label} · ${count}`} color="primary" />
        ))}
      </Box>
      <Typography variant="h6" gutterBottom>Packages by destination</Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
        {byDestination.map(([label, count]) => (
          <Chip key={label} label={`${label} · ${count}`} color="secondary" variant="outlined" />
        ))}
      </Box>

      <Grid container spacing={2}>
        {packages.map((p) => {
          const image = packageImage(p.destination);
          return (
            <Grid item xs={12} sm={6} md={4} key={p.id}>
              <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                <PackagePhoto image={image} height={180} />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6">{p.title}</Typography>
                  <Box sx={{ display: "flex", gap: 1, my: 1, flexWrap: "wrap" }}>
                    <Chip label={p.destination} color="primary" size="small" />
                    <Chip label={p.country} color="secondary" size="small" />
                  </Box>
                  <Typography variant="body2" paragraph>{p.description}</Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mb: 1 }}>
                    {p.highlights.map((h) => (
                      <Chip key={h} label={h} size="small" variant="outlined" />
                    ))}
                  </Box>
                  <Typography variant="caption" color="text.secondary" display="block">
                    Package #{p.id} · Added {formatDate(p.created_at)}
                  </Typography>
                  {image && (
                    <Typography variant="caption" color="text.secondary" display="block">
                      {image.credit} (<Link href={image.source} target="_blank" rel="noreferrer">source</Link>)
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      <Box sx={{ mt: 3 }}>
        <Button variant="contained" color="primary" href="/packages">Browse all packages</Button>
      </Box>
    </main>
  );
}
