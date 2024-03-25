export async function getData() {
  const res = await fetch("https://httpbin.org/get");
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
