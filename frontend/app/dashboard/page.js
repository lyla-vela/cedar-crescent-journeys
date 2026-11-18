import { getPackages, getInquiries } from "../../lib/api.js";
import { formatDate, countBy } from "../../lib/format.js";
import { packageImage } from "../../lib/images.js";
import PackagePhoto from "../PackagePhoto.js";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default async function Dashboard() {
  const [packages, inquiries] = await Promise.all([getPackages(), getInquiries()]);
  const byCountry = countBy(packages, (p) => p.country);
  const byDestination = countBy(inquiries, (i) => i.destination);
  const stats = [
    { label: "Packages", value: packages.length },
    { label: "Inquiries", value: inquiries.length },
  ];
  return (
    <main>
      <Typography variant="h3" component="h1" color="primary" gutterBottom>Admin Dashboard</Typography>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {stats.map((s) => (
          <Grid item xs={12} sm={6} key={s.label}>
            <Card sx={{ bgcolor: "primary.main", color: "primary.contrastText" }}>
              <CardContent>
                <Typography variant="h4">{s.value}</Typography>
                <Typography variant="body2">{s.label}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h5" component="h2" gutterBottom>Packages by country</Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
        {byCountry.map(([label, count]) => (
          <Chip key={label} label={`${label} · ${count}`} color="primary" />
        ))}
      </Box>
      <Typography variant="h5" component="h2" gutterBottom>Inquiries by destination</Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
        {byDestination.map(([label, count]) => (
          <Chip key={label} label={`${label} · ${count}`} color="secondary" />
        ))}
      </Box>

      <Typography variant="h5" component="h2" gutterBottom>Packages</Typography>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {packages.map((p) => {
          const image = packageImage(p.destination);
          return (
            <Grid item xs={12} sm={6} key={p.id}>
              <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                <PackagePhoto image={image} height={160} />
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
                  <Typography variant="caption" color="text.secondary">
                    Package #{p.id} · Added {formatDate(p.created_at)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      <Typography variant="h5" component="h2" gutterBottom>Inquiries</Typography>
      <TableContainer component={Paper} sx={{ mb: 3 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell><TableCell>Name</TableCell><TableCell>Email</TableCell>
              <TableCell>Destination</TableCell><TableCell>Message</TableCell><TableCell>Received</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inquiries.map((i) => (
              <TableRow key={i.id}>
                <TableCell>{i.id}</TableCell><TableCell>{i.name}</TableCell><TableCell>{i.email}</TableCell>
                <TableCell>{i.destination}</TableCell><TableCell>{i.message}</TableCell>
                <TableCell>{formatDate(i.created_at)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="body2" color="text.secondary">
        To add a package or inquiry, use the FastAPI API: POST /api/packages or POST /api/inquiries (see README and /docs).
      </Typography>
    </main>
  );
}
