# Specification

## Summary
**Goal:** Add an in-app guide for replacing the placeholder photos, and ensure the UI stays usable if photo assets are missing or misnamed.

**Planned changes:**
- Add a small, clearly labeled help entry point on the Gifts screen (e.g., “How to add photos” / “Replace photos”) that opens an in-app help panel with English instructions.
- In the help panel, document exactly where to place images (`frontend/public/assets/generated`), how they are referenced (`/assets/generated/<filename>`), and which config fields to edit in `frontend/src/config/valentineContent.ts` (`HER_PHOTOS`, `COUPLE_PHOTOS`, `FINAL_COUPLE_PHOTO`), including the need for exact filenames (with extensions).
- Add graceful fallback UI for broken/missing images in the Gift 2 gallery, Gift 3 gallery, and the Final celebration photo, showing a styled (pink-theme) placeholder message like “Image not found: <filename>” while keeping the rest of the flow visually consistent and usable.

**User-visible outcome:** On the Gifts screen, users can open a built-in guide that explains how to replace the app’s photos, and if any photo filename is wrong or missing, the app shows a clear themed fallback message instead of looking broken.
