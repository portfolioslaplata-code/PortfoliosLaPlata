export function initializeAnalytics(config, measurementId) {
  if (
    !config.enabled ||
    !/^G-[A-Z0-9]+$/.test(measurementId || "") ||
    document.getElementById("site-analytics")
  )
    return false;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", measurementId, {
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });
  const script = document.createElement("script");
  script.id = "site-analytics";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
  document.head.append(script);
  return true;
}
