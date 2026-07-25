import { useEffect, useState } from "react";
import { COOKIE_CONSENT_EVENT, hasAdvertisingConsent } from "./consent";

const ADSENSE_CLIENT_ID =
  import.meta.env.VITE_GOOGLE_ADSENSE_CLIENT_ID || "ca-pub-7765754071910029";
const ADSENSE_BLOG_SLOT_ID =
  import.meta.env.VITE_GOOGLE_ADSENSE_BLOG_SLOT_ID || "7388867598";

function hasRealAdSenseClientId() {
  return /^ca-pub-\d{16}$/.test(ADSENSE_CLIENT_ID);
}

function canLoadAds() {
  return import.meta.env.PROD && hasRealAdSenseClientId() && hasAdvertisingConsent();
}

export function AdSenseLoader() {
  const [canLoad, setCanLoad] = useState(canLoadAds);

  useEffect(() => {
    function syncConsent() {
      setCanLoad(canLoadAds());
    }

    window.addEventListener(COOKIE_CONSENT_EVENT, syncConsent);
    return () => window.removeEventListener(COOKIE_CONSENT_EVENT, syncConsent);
  }, []);

  useEffect(() => {
    if (
      !canLoad ||
      document.querySelector('script[data-hudson-adsense], script[src*="pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]')
    ) {
      return;
    }

    const script = document.createElement("script");
    script.async = true;
    script.crossOrigin = "anonymous";
    script.dataset.hudsonAdsense = "true";
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`;
    document.head.appendChild(script);
  }, [canLoad]);

  return null;
}

export function BlogAdSlot({ className = "" }) {
  const [canRender, setCanRender] = useState(canLoadAds);

  useEffect(() => {
    function syncConsent() {
      setCanRender(canLoadAds());
    }

    window.addEventListener(COOKIE_CONSENT_EVENT, syncConsent);
    return () => window.removeEventListener(COOKIE_CONSENT_EVENT, syncConsent);
  }, []);

  if (!canRender || !ADSENSE_BLOG_SLOT_ID) return null;

  return <AdSlot className={className} slot={ADSENSE_BLOG_SLOT_ID} label="Advertisement" />;
}

export function AdSlot({ slot, label = "Advertisement", className = "" }) {
  useEffect(() => {
    if (!canLoadAds() || !slot) return;

    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch {
      // Ad blockers or script timing can prevent ads from rendering; keep layout stable.
    }
  }, [slot]);

  if (!canLoadAds() || !slot) return null;

  return (
    <aside className={`adSlot ${className}`.trim()} aria-label={label}>
      <span className="blogAdLabel">{label}</span>
      <ins
        className="adsbygoogle"
        style={{ display: "block", textAlign: "center" }}
        data-ad-layout="in-article"
        data-ad-client={ADSENSE_CLIENT_ID}
        data-ad-slot={slot}
        data-ad-format="fluid"
      />
    </aside>
  );
}
