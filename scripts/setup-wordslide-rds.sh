#!/bin/bash
# Create rave_reviews database on the shared WordSlide RDS instance (via bastion)

set -e

PEM="${HOME}/wordslide-db-setup.pem"
BASTION="ec2-user@44.201.231.206"
RDS_HOST="dev-wordslide-db.cszqcws8wjsi.us-east-1.rds.amazonaws.com"

# Password: see ~/wordslide/aws-infrastructure/setup-database-via-bastion-final.sh
# Or set: export WORDSLIDE_DB_PASSWORD='...'

if [[ -z "${WORDSLIDE_DB_PASSWORD:-}" ]]; then
  echo "Set WORDSLIDE_DB_PASSWORD (see wordslide/aws-infrastructure/setup-database-via-bastion-final.sh)"
  exit 1
fi

DB_PASSWORD="$WORDSLIDE_DB_PASSWORD"

if [[ ! -f "$PEM" ]]; then
  echo "Missing SSH key: $PEM"
  exit 1
fi

chmod 400 "$PEM"

echo "Creating rave_reviews database on WordSlide RDS..."

ssh -i "$PEM" -o StrictHostKeyChecking=no "$BASTION" << EOF
  PGPASSWORD="${DB_PASSWORD}" psql -h ${RDS_HOST} -p 5432 -U postgres -d postgres -tc "SELECT 1 FROM pg_database WHERE datname = 'rave_reviews'" | grep -q 1 || \\
  PGPASSWORD="${DB_PASSWORD}" psql -h ${RDS_HOST} -p 5432 -U postgres -d postgres -c "CREATE DATABASE rave_reviews;"
  echo "Database rave_reviews is ready."
EOF

echo "Done. Next: npm run db:push && npm run db:seed"
