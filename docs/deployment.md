# Deployment Guide: AWS S3 + CloudFront

The Kiloforge site is a statically exported Next.js app deployed to **AWS S3** with **CloudFront** as the CDN. Deployment is automated via **GitHub Actions** on every push to `main`.

**Data Flow:**
User -> `kiloforge.dev` (AWS Route 53) -> AWS CloudFront -> S3 (`kiloforge-site-prod`)

---

## Architecture

- **Next.js** with `output: 'export'` generates a fully static site in `out/`
- **S3 bucket** (`kiloforge-site-prod`, us-east-1) stores the static files with block-all-public-access enabled
- **CloudFront** serves the site globally with edge caching, using Origin Access Control (OAC) to read from S3
- **Route 53** provides DNS (A record alias to CloudFront)
- **ACM** provides the SSL certificate (must be in us-east-1 for CloudFront)

## CI/CD Pipeline

On every push to `main`, GitHub Actions (`.github/workflows/deploy.yml`) runs:

1. `npm ci` — install dependencies
2. `npm run build` — static export to `out/`
3. `aws s3 sync out/ s3://kiloforge-site-prod --delete` — upload to S3
4. `aws cloudfront create-invalidation --paths "/*"` — bust the CDN cache

### GitHub Secrets Required

| Secret | Description |
|--------|-------------|
| `AWS_ACCESS_KEY_ID` | IAM user `kiloforge-site-deploy` access key |
| `AWS_SECRET_ACCESS_KEY` | IAM user secret key |
| `CLOUDFRONT_DISTRIBUTION_ID` | CloudFront distribution ID (e.g., `E1AWOUQ78MN9ZS`) |

## AWS Resources

### S3 Bucket
- **Name:** `kiloforge-site-prod`
- **Region:** us-east-1
- **Public access:** Blocked (CloudFront OAC handles access)
- **Bucket policy:** Allows `s3:GetObject` for CloudFront service principal, scoped to the distribution ARN

### CloudFront Distribution
- **Origin:** `kiloforge-site-prod.s3.us-east-1.amazonaws.com` with OAC
- **Default root object:** `index.html`
- **Custom error response:** 403 → `/404.html` (404 status)
- **Cache policy:** `CachingOptimized` (static assets are content-hashed)
- **Alternate domains:** `kiloforge.com`, `www.kiloforge.com`, `kiloforge.dev`
- **SSL:** ACM certificate (us-east-1)

### IAM User
- **Name:** `kiloforge-site-deploy`
- **Permissions:** S3 put/delete/list on the bucket + CloudFront invalidation on the distribution

### Route 53
- A record (alias) pointing to the CloudFront distribution

## Manual Cache Invalidation

If you need to force a cache refresh without deploying:

```bash
aws cloudfront create-invalidation \
  --distribution-id E1AWOUQ78MN9ZS \
  --paths "/*"
```
