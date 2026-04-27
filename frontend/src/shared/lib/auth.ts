const AUTH_KEY = "ols_auth";
const TTL_MS = 2 * 60 * 60 * 1000;

const VALID_USERNAME = "admin";
const VALID_PASSWORD_HASH = "9a593c5f28dcca6fb5aa390a553105ec2644222173da75467f14885e05108741";

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

export async function login(username: string, password: string): Promise<boolean> {
  if (username !== VALID_USERNAME) return false;
  const hash = await hashPassword(password);
  if (hash !== VALID_PASSWORD_HASH) return false;
  const expiry = Date.now() + TTL_MS;
  localStorage.setItem(AUTH_KEY, JSON.stringify({ expiry }));
  return true;
}

export function logout() {
  localStorage.removeItem(AUTH_KEY);
}

export function isAuthenticated(): boolean {
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    if (!raw) return false;
    const { expiry } = JSON.parse(raw);
    if (Date.now() > expiry) {
      logout();
      return false;
    }
    return true;
  } catch {
    return false;
  }
}