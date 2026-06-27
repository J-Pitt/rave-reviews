# AWS Production — WordSlide RDS

Use the **same RDS instance** as WordSlide with a separate database.

## Connection details

| Setting | Value |
|---------|-------|
| Endpoint | `dev-wordslide-db.cszqcws8wjsi.us-east-1.rds.amazonaws.com` |
| Port | `5432` |
| User | `postgres` |
| Database | `rave_reviews` |
| Security group | `sg-0eb6fe1920fee757a` |
| VPC | `vpc-0886de518fe3e9372` |

## 1. Open the security group (required)

RDS is publicly accessible, but the security group still filters traffic.

In **AWS Console → EC2 → Security Groups → `wordslide-game-DBSecurityGroup-...`**:

- **Edit inbound rules → Add rule**
- Type: **PostgreSQL**
- Port: **5432**
- Source: **My IP** (for local dev), or your Amplify/host IP range for production

Without this, connections will **timeout** even with the correct endpoint.

## 2. Create the database (one time)

After your IP is allowed:

```bash
PGPASSWORD='WordSlide2024!' psql \
  -h dev-wordslide-db.cszqcws8wjsi.us-east-1.rds.amazonaws.com \
  -p 5432 -U postgres -d postgres \
  -c "CREATE DATABASE rave_reviews;"
```

Or use the bastion script if direct access fails.

## 3. Local `.env.local`

```env
DATABASE_URL=postgresql://postgres:WordSlide2024%21@dev-wordslide-db.cszqcws8wjsi.us-east-1.rds.amazonaws.com:5432/rave_reviews?sslmode=require
```

(`!` must be URL-encoded as `%21`)

```bash
npm run db:push
npm run db:seed
npm run dev
```

## 4. AWS Amplify (production)

1. **Amplify → Create app → GitHub → `J-Pitt/rave-reviews`**
2. Environment variable: `DATABASE_URL` (same as above)
3. Add Amplify’s outbound IPs to the RDS security group (or use VPC peering)
4. Deploy — `amplify.yml` is included in the repo

WordSlide’s `wordslide_game` database is untouched; Rave Reviews uses `rave_reviews` only.
