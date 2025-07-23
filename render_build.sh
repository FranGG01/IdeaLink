#!/usr/bin/env bash
# exit on error
set -o errexit

# Frontend
npm install
npm run build

# Backend
pipenv install

# Alembic: marca migraciones como aplicadas (evita errores si la DB ya tiene las tablas)
pipenv run alembic stamp head

# Si necesitas aplicar migraciones nuevas (opcionales si ya están aplicadas)
# pipenv run flask db upgrade
