#!/bin/sh
set -e

# Ensure data and exercise asset directories exist and have proper permissions for user node (UID 1000)
mkdir -p /app/.data /app/public/assets/exercises
chown -R node:node /app/.data /app/public/assets/exercises 2>/dev/null || true
chmod -R 777 /app/.data /app/public/assets/exercises 2>/dev/null || true

# If running as root, drop privileges to node
if [ "$(id -u)" = '0' ]; then
  exec su-exec node "$@"
fi

exec "$@"

