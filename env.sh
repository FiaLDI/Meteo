#!/usr/bin/env bash

set -e

if [ -f .env ]; then
    echo ".env already exists."
    exit 0
fi

cat > .env <<'EOF'
NODE_ENV=production
HOST=0.0.0.0
API_PORT=8000
DATABASE_URL=postgresql://postgres:postgres@postgres:5432/meteo?schema=public
FRONTEND_URL=http://localhost:3000
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
POSTGRES_DB=meteo
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
EOF

echo ".env created."