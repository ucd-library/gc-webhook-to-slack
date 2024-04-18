#! /bin/bash

set -e
ROOT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd $ROOT_DIR

gcloud config set project digital-ucdavis-edu

gcloud functions deploy \
  gcWebhookToSlack \
  --runtime nodejs20 \
  --allow-unauthenticated \
  --set-secrets=WEBHOOK_SECRET=gc-webhook-to-slack-secret:latest \
  --trigger-http