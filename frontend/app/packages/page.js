import { getPackages } from "../../lib/api.js";
import { formatDate, countBy } from "../../lib/format.js";
import { packageImage } from "../../lib/images.js";
import PackagePhoto from "../PackagePhoto.js";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";

export default async function Packages({ searchParams }) {
  const packages = await getPackages();
  const q = (searchParams?.q || "").toLowerCase();
  const shown = packages.filter(p => !q || `${p.destination} ${p.country} ${p.title}`.toLowerCase().includes(q));
  const byCountry = countBy(packages, (p) => p.country);
  return (
    <main>
      <Typography variant="h3" component="h1" color="primary" gutterBottom>Packages from LAX</Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
        {byCountry.map(([label, count]) => (
          <Chip key={label} label={`${label} · ${count}`} color="primary" />
        ))}
      </Box>
      <Box component="form" sx={{ display: "flex", gap: 1, mb: 1 }}>
        <TextField name="q" defaultValue={searchParams?.q || ""} placeholder="Search Turkey, Lebanon, Dubai…" fullWidth size="small" />
        <Button type="submit" variant="contained" color="primary">Search</Button>
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Showing {shown.length} of {packages.length} packages
      </Typography>
      <Grid container spacing={2}>
        {shown.map((p) => {
          const image = packageImage(p.destination);
          return (
            <Grid item xs={12} sm={6} key={p.id}>
              <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                <PackagePhoto image={image} height={200} />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6">{p.title}</Typography>
                  <Box sx={{ display: "flex", gap: 1, my: 1, flexWrap: "wrap" }}>
                    <Chip label={p.destination} color="primary" size="small" />
                    <Chip label={p.country} color="secondary" size="small" />
                  </Box>
                  <Typography variant="body2" paragraph>{p.description}</Typography>
                  <Typography variant="subtitle2" gutterBottom>Highlights</Typography>
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

      <Paper sx={{ p: 2, mt: 3, bgcolor: "secondary.light" }}>
        <Typography variant="h5" component="h2" gutterBottom>Ask about a package</Typography>
        <Typography variant="body2">
          Use the inquiry form in the dashboard, or contact the agency — inquiries are saved via POST /api/inquiries.
        </Typography>
      </Paper>
    </main>
  );
}
