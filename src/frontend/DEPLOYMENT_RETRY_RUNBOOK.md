# Deployment Retry Runbook

This runbook describes how to retry deployment for the Valentine app and capture complete error logs for diagnosis.

## Prerequisites

- Ensure you have the Internet Computer SDK (dfx) installed
- Ensure you have Node.js and pnpm installed
- Ensure you are in the project root directory

## Pre-Deployment Checklist

Before deploying, verify that all required assets are in place:

### 1. Verify Gift 2 Photos Exist

Check that the following three files exist in `frontend/public/assets/generated/`:

- ✅ `IMG_0131-1.jpeg` (Yashika in patterned sweater with glasses)
- ✅ `IMG_4617-1.jpeg` (Close-up with nose piercing)
- ✅ `IMG_0156-1.jpeg` (Patterned sweater holding flowers)

**Quick verification command:**
