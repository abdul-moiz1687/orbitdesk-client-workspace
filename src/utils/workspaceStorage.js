export const SESSION_STORAGE_KEY = 'orbitdesk:session';
export const THEME_STORAGE_KEY = 'orbitdesk:theme';

export function accountStorageKey(email) {
  return `orbitdesk:workspace:${encodeURIComponent(String(email || '').trim().toLowerCase())}`;
}

export function readStoredValue(key, fallback = null) {
  try {
    const raw = window.localStorage.getItem(key);
    return raw === null ? fallback : JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function writeStoredValue(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export function removeStoredValue(key) {
  try {
    window.localStorage.removeItem(key);
  } catch {
    // The app can still be used for the current session if storage is unavailable.
  }
}
