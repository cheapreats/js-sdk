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
AZ_REPO=$(lsb_release -cs)
echo "deb [arch=amd64] https://packages.microsoft.com/repos/azure-cli/ ${AZ_REPO} main" | sudo tee /etc/apt/sources.list.d/azure-cli.list
sudo apt-key adv --keyserver packages.microsoft.com --recv-keys 52E16F86FEE04B979B07E28DB02C46DF417A0893
sudo apt-get install apt-transport-https
sudo apt-get update && sudo apt-get install azure-cli

echo "Pushing to Azure Blob Storage"
sudo az storage blob upload-batch --source . --destination "${AZURE_CONTAINER}" --pattern *.tar.gz*