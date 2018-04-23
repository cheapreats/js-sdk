#!/bin/bash

# Skip on pull request builds
if [[ -n "${CIRCLE_PR_NUMBER:-}" ]]; then
  exit
fi

if [[ -n "${CIRCLE_TAG:-}" ]]; then
  VERSION="${CIRCLE_TAG}"
elif [[ "${CIRCLE_BRANCH:-}" == "master" ]]; then
  VERSION="canary"
else
  echo "skipping because this is neither a push to master or a pull request. ${CIRCLE_TAG} ${CIRCLE_BRANCH}"
  exit
fi

echo "Installing Azure components"
# NOTE(bacongobbler): azure-cli needs a newer version of libffi/libssl. See https://github.com/Azure/azure-cli/issues/3720#issuecomment-350335381
sudo apt-get update && apt-get install -yq python-pip libffi-dev libssl-dev
easy_install pyOpenSSL
pip install --disable-pip-version-check --no-cache-dir azure-cli~=2.0

echo "Pushing to Azure Blob Storage"
az storage blob upload-batch --source . --destination "${AZURE_CONTAINER}" --pattern *.tar.gz*