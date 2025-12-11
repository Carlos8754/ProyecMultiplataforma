const API_URL = import.meta.env.VITE_CLASH_API;
const TOKEN = import.meta.env.VITE_API_TOKEN;

export async function fetchClash(endpoint: string) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Error ${res.status}: ${res.statusText}`);
  }

  return res.json();
}
