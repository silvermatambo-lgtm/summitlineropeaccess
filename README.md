# Summit Line Rope Access

Seven-page service website built by rebranding the supplied UltraMax 7 Pro Premium static PWA. Project photography and the Summit Line badge were supplied with the brief.

- Local preview: run `python3 -m http.server 8000` from the repository root and open `http://localhost:8000`.
- Deploy on Vercel using the Other framework preset and the repository root. No install, build step, server or environment variables are required.
- Branded services, project gallery, team information and quote/enquiry settings live in `site-config.js`. The WhatsApp handoff prepares messages only. Visitors must send their messages in WhatsApp.
- The PWA is installable in supported browsers. Saved pages and photos are available after the service worker has cached them. External WhatsApp requires an internet connection.
- Bump the cache version in `sw.js` when publishing changed assets. Keep the canonical URLs, Open Graph URLs, sitemap and robots sitemap reference in sync if switching to a custom domain.
