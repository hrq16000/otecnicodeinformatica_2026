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

# Official Gitleaks v8.30.1 release; the pinned archive checksum comes from
# the GitHub release metadata. No Docker pull, no downgrade, no scan bypass.
version='8.30.1'
archive_sha256='551f6fc83ea457d62a0d98237cbad105af8d557003051f41f3e7ca7b3f2470eb'
tmpdir="$(mktemp -d)"
trap 'rm -rf "$tmpdir"' EXIT
curl --fail --location --silent --show-error --retry 3 \
  --connect-timeout 15 --max-time 180 \
  "https://github.com/gitleaks/gitleaks/releases/download/v${version}/gitleaks_${version}_linux_x64.tar.gz" \
  --output "$tmpdir/gitleaks.tar.gz"
printf '%s  %s\n' "$archive_sha256" "$tmpdir/gitleaks.tar.gz" | sha256sum --check -
tar -xzf "$tmpdir/gitleaks.tar.gz" -C "$tmpdir" gitleaks
chmod 500 "$tmpdir/gitleaks"

timeout 18m "$tmpdir/gitleaks" git "$PWD" \
  "--log-opts=$history" --gitleaks-ignore-path "$PWD/.gitleaksignore" \
  --redact --no-banner --verbose
