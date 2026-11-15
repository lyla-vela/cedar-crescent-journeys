import { getPackages } from "../../lib/api.js";
export default async function Packages({ searchParams }) {
  const packages = await getPackages();
  const q = (searchParams?.q || "").toLowerCase();
  const shown = packages.filter(p => !q || `${p.destination} ${p.country} ${p.title}`.toLowerCase().includes(q));
  return (<main><h1>Packages from LAX</h1>
    <form><input name="q" defaultValue={searchParams?.q || ""} placeholder="Search Turkey, Lebanon, Dubai…" style={{ width: "100%", padding: 8 }} /><button type="submit">Search</button></form>
    <ul>{shown.map(p => <li key={p.id}><strong>{p.title}</strong> — {p.description}<br />Highlights: {p.highlights.join(", ")}</li>)}</ul>
    <h2>Ask about a package</h2>
    <p>Use the inquiry form in the dashboard, or contact the agency — inquiries are saved via POST /api/inquiries.</p>
  </main>);
}
