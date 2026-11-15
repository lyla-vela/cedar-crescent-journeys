export const metadata = { title: "LAX Travel Packages", description: "Travel packages from LAX to Turkey, Lebanon, Dubai, and destinations around the world." };
export default function RootLayout({ children }) {
  return (<html lang="en"><body style={{ fontFamily: "system-ui, sans-serif", maxWidth: 900, margin: "0 auto", padding: 24 }}>
    <nav style={{ display: "flex", gap: 16, marginBottom: 24 }}>
      <a href="/">Home</a><a href="/packages">Packages</a><a href="/dashboard">Dashboard</a>
    </nav>{children}</body></html>);
}
