#!/bin/bash

# Deployment Retry Script with Log Capture
# This script runs the deployment process and captures all output to a timestamped log file

set -e  # Exit on error (but we'll capture the error)

# Create logs directory if it doesn't exist
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
LOGS_DIR="$SCRIPT_DIR/../logs"
mkdir -p "$LOGS_DIR"

# Generate timestamp for log file
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
LOG_FILE="$LOGS_DIR/deploy-$TIMESTAMP.log"

echo "========================================" | tee "$LOG_FILE"
echo "Valentine App Deployment Attempt" | tee -a "$LOG_FILE"
echo "Started: $(date)" | tee -a "$LOG_FILE"
echo "Log file: $LOG_FILE" | tee -a "$LOG_FILE"
echo "========================================" | tee -a "$LOG_FILE"
echo "" | tee -a "$LOG_FILE"

# Capture environment information
echo "=== Environment Information ===" | tee -a "$LOG_FILE"
echo "Operating System: $(uname -s)" | tee -a "$LOG_FILE"
echo "Architecture: $(uname -m)" | tee -a "$LOG_FILE"
echo "dfx version: $(dfx --version 2>&1 || echo 'dfx not found')" | tee -a "$LOG_FILE"
echo "Node version: $(node --version 2>&1 || echo 'node not found')" | tee -a "$LOG_FILE"
echo "pnpm version: $(pnpm --version 2>&1 || echo 'pnpm not found')" | tee -a "$LOG_FILE"
echo "Current directory: $(pwd)" | tee -a "$LOG_FILE"
echo "" | tee -a "$LOG_FILE"

# Function to run command and capture output
run_step() {
    local step_name="$1"
    shift
    echo "=== $step_name ===" | tee -a "$LOG_FILE"
    echo "Command: $*" | tee -a "$LOG_FILE"
    echo "" | tee -a "$LOG_FILE"
    
    if "$@" 2>&1 | tee -a "$LOG_FILE"; then
        echo "" | tee -a "$LOG_FILE"
        echo "✓ $step_name completed successfully" | tee -a "$LOG_FILE"
        echo "" | tee -a "$LOG_FILE"
        return 0
    else
        local exit_code=$?
        echo "" | tee -a "$LOG_FILE"
        echo "✗ $step_name failed with exit code $exit_code" | tee -a "$LOG_FILE"
        echo "" | tee -a "$LOG_FILE"
        return $exit_code
    fi
}

# Navigate to project root (assuming script is in frontend/scripts)
cd "$SCRIPT_DIR/../.."

# Pre-build verification: Check for required Gift 2 photos
echo "=== Pre-Build Verification: Checking Gift 2 Photos ===" | tee -a "$LOG_FILE"
ASSETS_DIR="frontend/public/assets/generated"
REQUIRED_PHOTOS=("IMG_0131-1.jpeg" "IMG_4617-1.jpeg" "IMG_0156-1.jpeg")
MISSING_PHOTOS=()

for photo in "${REQUIRED_PHOTOS[@]}"; do
    if [ -f "$ASSETS_DIR/$photo" ]; then
        echo "✓ Found: $photo" | tee -a "$LOG_FILE"
    else
        echo "✗ Missing: $photo" | tee -a "$LOG_FILE"
        MISSING_PHOTOS+=("$photo")
    fi
done

if [ ${#MISSING_PHOTOS[@]} -gt 0 ]; then
    echo "" | tee -a "$LOG_FILE"
    echo "⚠️  WARNING: ${#MISSING_PHOTOS[@]} required photo(s) missing from $ASSETS_DIR" | tee -a "$LOG_FILE"
    echo "Missing files:" | tee -a "$LOG_FILE"
    for photo in "${MISSING_PHOTOS[@]}"; do
        echo "  - $photo" | tee -a "$LOG_FILE"
    done
    echo "" | tee -a "$LOG_FILE"
    echo "Please add these files to $ASSETS_DIR before deploying." | tee -a "$LOG_FILE"
    echo "Deployment will continue, but Gift 2 will show placeholder fallbacks." | tee -a "$LOG_FILE"
    echo "" | tee -a "$LOG_FILE"
else
    echo "" | tee -a "$LOG_FILE"
    echo "✓ All required Gift 2 photos are present" | tee -a "$LOG_FILE"
    echo "" | tee -a "$LOG_FILE"
fi

# Run deployment steps
DEPLOYMENT_FAILED=0

run_step "Step 1: Install frontend dependencies" bash -c "cd frontend && pnpm install" || DEPLOYMENT_FAILED=1

if [ $DEPLOYMENT_FAILED -eq 0 ]; then
    run_step "Step 2: Start dfx (if not running)" dfx start --background || DEPLOYMENT_FAILED=1
fi

if [ $DEPLOYMENT_FAILED -eq 0 ]; then
    run_step "Step 3: Create canisters" dfx canister create --all || DEPLOYMENT_FAILED=1
fi

if [ $DEPLOYMENT_FAILED -eq 0 ]; then
    run_step "Step 4: Generate backend bindings" dfx generate backend || DEPLOYMENT_FAILED=1
fi

if [ $DEPLOYMENT_FAILED -eq 0 ]; then
    run_step "Step 5: Build frontend" bash -c "cd frontend && pnpm run build:skip-bindings" || DEPLOYMENT_FAILED=1
fi

if [ $DEPLOYMENT_FAILED -eq 0 ]; then
    run_step "Step 6: Deploy canisters" dfx deploy || DEPLOYMENT_FAILED=1
fi

# Summary
echo "" | tee -a "$LOG_FILE"
echo "========================================" | tee -a "$LOG_FILE"
if [ $DEPLOYMENT_FAILED -eq 0 ]; then
    echo "✓ DEPLOYMENT SUCCESSFUL" | tee -a "$LOG_FILE"
    echo "" | tee -a "$LOG_FILE"
    echo "The Valentine app has been deployed successfully." | tee -a "$LOG_FILE"
    echo "Check the output above for canister URLs." | tee -a "$LOG_FILE"
    echo "" | tee -a "$LOG_FILE"
    echo "=== Post-Deployment Validation Checklist ===" | tee -a "$LOG_FILE"
    echo "Please verify the following:" | tee -a "$LOG_FILE"
    echo "1. Open the app and navigate to Gift 2 (Beautiful You)" | tee -a "$LOG_FILE"
    echo "2. Verify all 3 photos appear (no 'Image not found' placeholders)" | tee -a "$LOG_FILE"
    echo "3. Test direct asset URLs in browser:" | tee -a "$LOG_FILE"
    echo "   - /assets/generated/IMG_0131-1.jpeg" | tee -a "$LOG_FILE"
    echo "   - /assets/generated/IMG_4617-1.jpeg" | tee -a "$LOG_FILE"
    echo "   - /assets/generated/IMG_0156-1.jpeg" | tee -a "$LOG_FILE"
else
    echo "✗ DEPLOYMENT FAILED" | tee -a "$LOG_FILE"
    echo "" | tee -a "$LOG_FILE"
    echo "Please review the complete error output above." | tee -a "$LOG_FILE"
    echo "Share the log file for support: $LOG_FILE" | tee -a "$LOG_FILE"
fi
echo "Completed: $(date)" | tee -a "$LOG_FILE"
echo "========================================" | tee -a "$LOG_FILE"

exit $DEPLOYMENT_FAILED
