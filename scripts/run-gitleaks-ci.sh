#!/usr/bin/env bash
set -euo pipefail

case "${GITHUB_EVENT_NAME:-workflow_dispatch}" in
  schedule|workflow_dispatch) history='--all --full-history' ;;
  pull_request|push)
    if [[ ! ${BASE_SHA:-} =~ ^[a-f0-9]{40}$ ]] || ! git merge-base --is-ancestor "$BASE_SHA" HEAD; then
      echo '::error::A base da varredura precisa ser um commit ancestral do HEAD.' >&2
      exit 1
    fi
    history="--full-history --diff-merges=first-parent $BASE_SHA..HEAD"
    ;;
  *) echo '::error::Evento não reconhecido para a varredura.' >&2; exit 1 ;;
esac

timeout 18m docker run --rm \
  -v "$PWD:/repo:ro" \
  ghcr.io/gitleaks/gitleaks:v8.30.1 \
  git /repo "--log-opts=$history" --gitleaks-ignore-path /repo/.gitleaksignore \
  --redact --no-banner --verbose
