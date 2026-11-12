#!/usr/bin/env bash
set -euo pipefail

history='--full-history HEAD'
case "${GITHUB_EVENT_NAME:-workflow_dispatch}" in
  schedule|workflow_dispatch) history='--all --full-history' ;;
esac

timeout 18m docker run --rm \
  -v "$PWD:/repo:ro" \
  ghcr.io/gitleaks/gitleaks:v8.30.1 \
  git /repo "--log-opts=$history" --gitleaks-ignore-path /repo/.gitleaksignore \
  --redact --no-banner --verbose
