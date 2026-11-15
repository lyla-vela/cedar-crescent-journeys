import { seedPackages, seedInquiries } from "./seed.js";
const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
export async function fetchList(path, fallback) {
  try {
    const res = await fetch(`${base}${path}`, { cache: "no-store" });
    if (!res.ok) throw new Error("api error");
    return await res.json();
  } catch { return fallback; }
}
export const getPackages = () => fetchList("/api/packages", seedPackages);
export const getInquiries = () => fetchList("/api/inquiries", seedInquiries);
export async function submitInquiry(data) {
  const res = await fetch(`${base}/api/inquiries`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
  if (!res.ok) throw new Error("inquiry failed");
  return res.json();
}
