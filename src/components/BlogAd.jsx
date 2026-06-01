import { useEffect } from "react";

const ADSENSE_CLIENT_ID = "ca-pub-7765754071910029";
const ADSENSE_IN_ARTICLE_SLOT_ID = "7388867598";

export default function BlogAd({ className = "" }) {
  useEffect(() => {
    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch {
      // Ad blockers or local script blocking should not break article rendering.
    }
  }, []);

  return (
    <aside className={`blogAd ${className}`.trim()} aria-label="Advertisement">
      <span className="blogAdLabel">Advertisement</span>
      <ins
        className="adsbygoogle"
        style={{ display: "block", textAlign: "center" }}
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client={ADSENSE_CLIENT_ID}
        data-ad-slot={ADSENSE_IN_ARTICLE_SLOT_ID}
      />
    </aside>
  );
}
