import { getPackages, getInquiries } from "../../lib/api.js";
export default async function Dashboard() {
  const [packages, inquiries] = await Promise.all([getPackages(), getInquiries()]);
  return (<main><h1>Admin Dashboard</h1>
    <p>Packages: {packages.length} · Inquiries: {inquiries.length}</p>
    <h2>Packages</h2><ul>{packages.map(p => <li key={p.id}>{p.title} — {p.destination}, {p.country}</li>)}</ul>
    <h2>Inquiries</h2><ul>{inquiries.map(i => <li key={i.id}>{i.name} ({i.email}) — {i.destination}: {i.message}</li>)}</ul>
    <p>To add a package or inquiry, use the FastAPI API: POST /api/packages or POST /api/inquiries (see README and /docs).</p>
  </main>);
}
