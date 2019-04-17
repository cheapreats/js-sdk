#!/usr/bin/env bash

# Generate docs
node_modules/.bin/jsdoc -c jsdoc.json --readme README.md
sleep 1
# Switch to clean and updated docs branch
git checkout gh-pages
git clean -df
git pull origin gh-pages
# Overwrite docs
yes | cp -rf docs/* ./
sleep 1
## Publish
git add -A
git commit -m"Updating docs"
git push origin gh-pages
# Switch back to master
git checkout master
