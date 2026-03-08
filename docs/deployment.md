# Deployment Guide: Vercel with AWS CloudFront (Custom Domain Proxy)

Welcome! This guide explains how to deploy the Kiloforge site to Vercel and then use **AWS CloudFront** as a CDN proxy in front of it.

### Why CloudFront?

Vercel restricts custom domains on certain plans (like Team accounts require a paid plan for custom domains). By placing CloudFront in front of Vercel, we can attach our custom domain directly to AWS. CloudFront then silently proxies the traffic to the free `.vercel.app` URL under the hood!

**Data Flow:**
User -> `kiloforge.com` (AWS Route 53) -> AWS CloudFront -> `kiloforge-site.vercel.app` (Vercel)

---

## Step 1: Deploy to Vercel

1. Push your `kiloforge_site` folder to a new repository on **GitHub**.
2. Log into **Vercel** (https://vercel.com).
3. Click **Add New...** -> **Project**.
4. Import your newly created GitHub repository.
5. Vercel will auto-detect Next.js. Click **Deploy**.
6. When finished, Vercel gives you an auto-generated URL (e.g., `kiloforge-site-xxxx.vercel.app`). **Copy this URL**.

## Step 2: Request an SSL Certificate in AWS

Before making the CloudFront distribution, you need an SSL cert for your custom domain.

1. Log into your **AWS Management Console**.
2. Go to **Certificate Manager (ACM)**.
3. **CRITICAL:** Switch your AWS region to **US East (N. Virginia) `us-east-1`**. CloudFront _only_ accepts certificates created in this specific region!
4. Click **Request a certificate** -> **Request a public certificate**.
5. Domain names: Enter `kiloforge.com` and click "Add another name to this certificate" and enter `*.kiloforge.com` (for www and subdomains).
6. Validation method: **DNS validation**.
7. Click **Request**.
8. Go into the certificate details and click **Create records in Route 53** to validate it (assuming your domain's DNS is already governed by Route 53). Wait a few minutes for the status to become **Issued**.

## Step 3: Create the CloudFront Distribution

1. Open **CloudFront** in the AWS Console.
2. Click **Create Distribution**.
3. **Origin domain:** Paste your Vercel URL here (e.g., `kiloforge-site-xxxx.vercel.app`). Do _not_ include `https://`.
4. **Protocol:** HTTPS only.
5. **Viewer protocol policy:** Redirect HTTP to HTTPS.
6. **Allowed HTTP methods:** `GET, HEAD, OPTIONS, PUT, POST, PATCH, DELETE`. (Needed if you ever add Next.js API routes or server actions).
7. **Cache key and origin requests:**
   - Select **Cache policy and origin request policy**.
   - **Cache policy:** `CachingOptimized` (or create a custom one if you have dynamic SSR pages that shouldn't be cached).
   - **Origin request policy:** Create a new custom policy:
     - Name: `VercelProxyPolicy`
     - **Headers: None** (This is the magic trick! We specifically do _not_ want to forward the `Host` header, so Vercel gets the `.vercel.app` Host header and serves the site instead of throwing a 404 because it doesn't recognize `kiloforge.com`).
     - Query strings: **All**
     - Cookies: **All**
     - Attach this new policy.
8. **Web Application Firewall (WAF):** Disable (unless you want to pay for it).
9. **Alternate domain name (CNAME):** Click Add item, and enter `kiloforge.com`. Add another item for `www.kiloforge.com`.
10. **Custom SSL certificate:** Select the ACM certificate you created in Step 2.
11. Click **Create distribution**.

## Step 4: Point Route 53 to CloudFront

1. Open **Route 53**.
2. Go to your **Hosted zones** and click on your domain (`kiloforge.com`).
3. Click **Create record**.
4. **Record name:** Leave blank (for the root domain).
5. **Record type:** `A - Routes traffic to an IPv4 address`.
6. Enable the **Alias** toggle.
7. **Route traffic to:** Choose **Alias to CloudFront distribution**.
8. Select the CloudFront distribution you just created (it should appear in the dropdown. It looks like `d1234xx.cloudfront.net`).
9. Click **Create records**.
10. Optional: Repeat for a `www` record.

## Step 5: Test it out!

Wait about 5-10 minutes for the CloudFront distribution to finish deploying. Then, try visiting `https://kiloforge.com`!

AWS CloudFront will safely proxy requests to Vercel. Because we aren't forwarding the Host header, Vercel never knows that `kiloforge.com` is accessing the site, and completely bypasses any Custom Domain restrictions on your Vercel account.
