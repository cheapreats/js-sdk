#!/usr/bin/env bash
babel . -d lib --ignore node_modules
cp package.json lib/
