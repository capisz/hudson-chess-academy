import { useCallback, useEffect, useRef, useState } from "react";
import {
  COOKIE_SETTINGS_EVENT,
  DEFAULT_CONSENT,
  getConsent,
  setConsent,
} from "./consent";

function getInitialPreferences() {
  const saved = getConsent();
  return saved || DEFAULT_CONSENT;
}

export default function CookieConsent() {
  const [savedConsent, setSavedConsent] = useState(() => getConsent());
  const [isBannerVisible, setIsBannerVisible] = useState(() => !getConsent());
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const [preferences, setPreferences] = useState(getInitialPreferences);
  const closeButtonRef = useRef(null);

  const closePreferences = useCallback(() => {
    setIsPreferencesOpen(false);
    if (!savedConsent) setIsBannerVisible(true);
  }, [savedConsent]);

  useEffect(() => {
    function openPreferences() {
      const current = getInitialPreferences();
      setPreferences(current);
      setIsPreferencesOpen(true);
      setIsBannerVisible(false);
    }

    window.addEventListener(COOKIE_SETTINGS_EVENT, openPreferences);
    return () => window.removeEventListener(COOKIE_SETTINGS_EVENT, openPreferences);
  }, []);

  useEffect(() => {
    if (!isPreferencesOpen) return undefined;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.setTimeout(() => closeButtonRef.current?.focus(), 0);

    function closeOnEscape(event) {
      if (event.key === "Escape") closePreferences();
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [closePreferences, isPreferencesOpen]);

  function saveConsent(nextConsent) {
    const consent = setConsent({ ...nextConsent, updatedAt: new Date().toISOString() });
    setSavedConsent(consent);
    setPreferences(consent || DEFAULT_CONSENT);
    setIsBannerVisible(false);
    setIsPreferencesOpen(false);
  }

  function updatePreference(key, value) {
    setPreferences((current) => ({ ...current, [key]: value }));
  }

  return (
    <>
      {isBannerVisible && (
        <section className="cookieBanner" role="region" aria-label="Cookie consent notice">
          <div className="cookieBannerCopy">
            <p className="eyebrow">Privacy choices</p>
            <h2>Cookies and ads preferences</h2>
            <p>
              Horizon Chess uses essential site storage, discloses privacy-friendly Vercel Analytics, and may later use Google AdSense advertising cookies only when enabled.
            </p>
          </div>
          <div className="cookieBannerActions">
            <button className="btnPrimary" type="button" onClick={() => saveConsent({ analytics: true, advertising: true })}>
              Accept All
            </button>
            <button className="btnGhost cookieBannerReject" type="button" onClick={() => saveConsent({ analytics: false, advertising: false })}>
              Reject Non-Essential
            </button>
            <button className="cookieTextButton" type="button" onClick={() => setIsPreferencesOpen(true)}>
              Manage Preferences
            </button>
          </div>
        </section>
      )}

      {isPreferencesOpen && (
        <div className="cookieModalOverlay" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) closePreferences();
        }}>
          <section
            className="cookieModal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-preferences-title"
            aria-describedby="cookie-preferences-description"
          >
            <button
              className="consultationClose"
              type="button"
              aria-label="Close cookie preferences"
              onClick={closePreferences}
              ref={closeButtonRef}
            >
              ×
            </button>
            <div className="cookieModalHeader">
              <p className="eyebrow">Cookie settings</p>
              <h2 id="cookie-preferences-title">Manage your preferences</h2>
              <p id="cookie-preferences-description">
                Essential storage keeps the site working. Analytics and advertising can be turned on or off below.
              </p>
            </div>

            <div className="cookiePreferenceList">
              <CookieToggle
                title="Essential cookies"
                description="Required for core site features, such as remembering this consent choice. These are always active."
                checked
                disabled
              />
              <CookieToggle
                title="Analytics"
                description="Records your preference for optional analytics. Vercel Web Analytics is currently cookieless and stores anonymized data."
                checked={preferences.analytics}
                onChange={(checked) => updatePreference("analytics", checked)}
              />
              <CookieToggle
                title="Advertising"
                description="Allows Google AdSense and third-party advertising cookies if AdSense is configured later."
                checked={preferences.advertising}
                onChange={(checked) => updatePreference("advertising", checked)}
              />
            </div>

            <div className="cookieModalActions">
              <button className="btnPrimary" type="button" onClick={() => saveConsent(preferences)}>
                Save Preferences
              </button>
              <button className="btnGhost" type="button" onClick={() => saveConsent({ analytics: true, advertising: true })}>
                Accept All
              </button>
              <button className="cookieTextButton" type="button" onClick={() => saveConsent({ analytics: false, advertising: false })}>
                Reject Non-Essential
              </button>
            </div>
          </section>
        </div>
      )}
    </>
  );
}

function CookieToggle({ title, description, checked, disabled = false, onChange }) {
  return (
    <label className={disabled ? "cookieToggle cookieToggleDisabled" : "cookieToggle"}>
      <span>
        <strong>{title}</strong>
        <small>{description}</small>
      </span>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(event) => onChange?.(event.target.checked)}
      />
      <i aria-hidden="true" />
    </label>
  );
}
