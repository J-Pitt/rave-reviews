#!/bin/bash
# SSH tunnel to WordSlide RDS via bastion (required — RDS is private)
# Run in a separate terminal and keep it open while developing.

set -e

PEM="${HOME}/wordslide-db-setup.pem"
BASTION="ec2-user@44.201.231.206"
RDS_HOST="dev-wordslide-db.cszqcws8wjsi.us-east-1.rds.amazonaws.com"
LOCAL_PORT=5433

if [[ ! -f "$PEM" ]]; then
  echo "Missing SSH key: $PEM"
  exit 1
fi

chmod 400 "$PEM"

echo "Opening tunnel localhost:${LOCAL_PORT} -> ${RDS_HOST}:5432"
echo "Keep this terminal open. Press Ctrl+C to close."
echo ""

ssh -i "$PEM" \
  -o StrictHostKeyChecking=no \
  -N -L "${LOCAL_PORT}:${RDS_HOST}:5432" \
  "$BASTION"
