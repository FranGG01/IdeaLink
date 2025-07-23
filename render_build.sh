#!/usr/bin/env bash
# exit on error
set -o errexit

# Frontend
npm install
npm run build

# Backend
pipenv install

pipenv run alembic upgrade head
