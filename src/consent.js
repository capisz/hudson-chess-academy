export const COOKIE_CONSENT_STORAGE_KEY = "horizon_chess_cookie_consent";
export const COOKIE_CONSENT_EVENT = "horizon-cookie-consent-change";
export const COOKIE_SETTINGS_EVENT = "horizon-open-cookie-settings";

export const DEFAULT_CONSENT = Object.freeze({
  essential: true,
  analytics: false,
  advertising: false,
});

export function hasConsent() {
  return Boolean(getConsent());
}

export function getConsent() {
  if (typeof window === "undefined") return null;

  try {
    const saved = window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
    if (!saved) return null;

    const parsed = JSON.parse(saved);
    return normalizeConsent(parsed);
  } catch {
    return null;
  }
}

export function setConsent(nextConsent) {
  if (typeof window === "undefined") return null;

  const consent = normalizeConsent(nextConsent);

  try {
    window.localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, JSON.stringify(consent));
    window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_EVENT, { detail: consent }));
  } catch {
    // If storage is blocked, keep the current page usable without optional tracking.
  }

  return consent;
}

export function hasAnalyticsConsent() {
  return getConsent()?.analytics === true;
}

export function hasAdvertisingConsent() {
  return getConsent()?.advertising === true;
}

export function clearConsent() {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.removeItem(COOKIE_CONSENT_STORAGE_KEY);
    window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_EVENT, { detail: null }));
  } catch {
    // No-op when storage is unavailable.
  }
}

export function openCookieSettings() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(COOKIE_SETTINGS_EVENT));
}

function normalizeConsent(consent) {
  return {
    essential: true,
    analytics: consent?.analytics === true,
    advertising: consent?.advertising === true,
    version: 1,
    updatedAt: consent?.updatedAt || new Date().toISOString(),
  };
}
