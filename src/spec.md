# Specification

## Summary
**Goal:** Make Gift 2 (“Beautiful You”) reliably show the user’s three provided photos (and no placeholder images).

**Planned changes:**
- Update Gift 2 gallery to be driven only by `HER_PHOTOS` in `frontend/src/config/valentineContent.ts`, ensuring it is exactly `['IMG_0131-1.jpeg','IMG_4617-1.jpeg','IMG_0156-1.jpeg']` in that order.
- Remove/replace any Gift 2 placeholder image filename references so Gift 2 renders only those three images.
- Verify the three JPEG assets exist in `frontend/public/assets/generated/` with exact matching filenames/case and are served at `/assets/generated/<filename>`, then rebuild/redeploy and validate in the live preview.

**User-visible outcome:** Gift 2 displays exactly 3 photos—the user-provided images—in the correct order, with no placeholder photos and no “Image not found” fallbacks.
