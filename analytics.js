// Analytics tracking script for apimonster webhook
(function() {
  const WEBHOOK_URL = 'https://api.apimonster.ru/webhooks/151937/32380/177/53f8bbd64336a41bdf5de706d8898358/';

  // Track page view
  function trackPageView() {
    const data = {
      event: 'pageview',
      page: window.location.pathname,
      hostname: window.location.hostname,
      referrer: document.referrer,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      language: navigator.language
    };

    sendAnalytics(data);
  }

  // Track clicks on links
  function trackLinkClick(event) {
    if (event.target.tagName === 'A') {
      const data = {
        event: 'click',
        type: 'link',
        href: event.target.href,
        text: event.target.textContent,
        page: window.location.pathname,
        timestamp: new Date().toISOString()
      };
      sendAnalytics(data);
    }
  }

  // Track form submissions
  function trackFormSubmit(event) {
    const data = {
      event: 'submit',
      type: 'form',
      formId: event.target.id || 'unnamed-form',
      page: window.location.pathname,
      timestamp: new Date().toISOString()
    };
    sendAnalytics(data);
  }

  // Send data to webhook
  function sendAnalytics(data) {
    if (navigator.sendBeacon) {
      // Use sendBeacon for reliable delivery
      navigator.sendBeacon(WEBHOOK_URL, JSON.stringify(data));
    } else {
      // Fallback to fetch
      fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        keepalive: true
      }).catch(err => console.error('Analytics error:', err));
    }
  }

  // Initialize tracking when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    // Track initial page view
    trackPageView();

    // Track link clicks
    document.addEventListener('click', trackLinkClick);

    // Track form submissions
    document.addEventListener('submit', trackFormSubmit);
  }
})();
