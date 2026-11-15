import { getPackages } from "../lib/api.js";
export default async function Home() {
  const packages = await getPackages();
  return (<main><h1>Travel Packages from LAX</h1>
    <p>Travel packages from Los Angeles (LAX) to destinations around the world — including Turkey, Lebanon, and Dubai.</p>
    <ul>{packages.map(p => <li key={p.id}><strong>{p.title}</strong> — {p.description}</li>)}</ul>
    <p><a href="/packages">Browse all packages</a></p>
  </main>);
}
