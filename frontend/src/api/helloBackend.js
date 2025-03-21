export async function getHelloBackend() {
  const response = await fetch("/api");
  const data = await response.json();
  return data;
}
