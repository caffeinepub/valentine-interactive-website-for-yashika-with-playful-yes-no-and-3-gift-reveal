# Specification

## Summary
**Goal:** Fix Gift 2 (“Beautiful You”) so the user’s three photos are present in static assets and reliably load on the deployed site.

**Planned changes:**
- Ensure the three required image files exist at `frontend/public/assets/generated/` with the exact case-sensitive filenames.
- Verify/update `frontend/src/config/valentineContent.ts` so Gift 2 is driven only by `HER_PHOTOS` and references exactly `['IMG_0131-1.jpeg','IMG_4617-1.jpeg','IMG_0156-1.jpeg']` in that order (no placeholders).
- Rebuild/redeploy the frontend and validate the three images load via `/assets/generated/<filename>` URLs on the live site.

**User-visible outcome:** Gift 2 displays the three user photos (no “Image not found” fallback cards) both in the gallery and via direct image URLs.
