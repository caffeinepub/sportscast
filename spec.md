# MatchMind

## Current State
MatchMind is a fully working IPL cricket prediction PWA with all tabs (Home, Stats, Groups, Friends, Shop, Settings), real IPL 2026 fixtures with countdown timers, affiliate shop, friends/leaderboard, and multi-language support.

## Requested Changes (Diff)

### Add
- PWA manifest (manifest.json) with MatchMind name, neon green theme, and app icon
- Service worker (sw.js) with network-first caching strategy for offline support
- PWA meta tags in index.html (apple-mobile-web-app, theme-color, manifest link)
- PWA install prompt component in the UI

### Modify
- index.html: add manifest link, theme-color, apple PWA meta tags, SW registration script

### Remove
- Nothing

## Implementation Plan
1. manifest.json and sw.js already written
2. index.html already updated
3. Add PWAInstallBanner component to App.tsx that shows an "Add to Home Screen" prompt
