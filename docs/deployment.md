# Deployment & Custom Domain Guide (Namecheap -> AWS Route53 -> Vercel)

Welcome! This guide explains how to properly route a domain purchased on Namecheap over to AWS Route 53, and connect it to a Vercel deployment of the Kiloforge site.

## The Strategy

Instead of pointing Namecheap directly to Vercel, we use **AWS Route 53** as the "middleman" (the DNS Provider). This allows you to manage all your routing rules (A records, CNAMEs, TXT records for email) within AWS while still hosting the website on Vercel.

**Data Flow:**
Namecheap (Registrar) -> AWS Route 53 (DNS Provider) -> Vercel (Hosting)

---

## Step 1: Create a Hosted Zone in AWS Route 53

Before touching Namecheap, you need to tell AWS to expect traffic for your domain.

1. Log into your **AWS Management Console**.
2. Search for and open **Route 53**.
3. In the left sidebar, click **Hosted zones**.
4. Click the orange **Create hosted zone** button.
5. In the **Domain name** field, type your exact domain (e.g., `kiloforge.com`).
6. Leave the _Type_ as **Public hosted zone**.
7. Click **Create hosted zone**.

## Step 2: Get your AWS Nameservers (NS Records)

1. AWS will immediately open your new Hosted Zone.
2. Look at the **Records** table. Find the record with the type **NS** (Name Server).
3. Under the **Value/Route traffic to** column, you will see **four different URLs**. They typically look like this:
   - `ns-xxx.awsdns-xx.net.`
   - `ns-xxxx.awsdns-xx.org.`
   - `ns-xxxx.awsdns-xx.co.uk.`
   - `ns-xxx.awsdns-xx.com.`
4. **Copy all four of these nameservers.** (You can omit the trailing dot at the end of each one).

## Step 3: Rehome Namecheap to AWS (Update Nameservers)

Now you must tell Namecheap to stop managing the DNS and hand control over to AWS Route 53.

1. Log into your **Namecheap account**.
2. Go to your **Domain List**.
3. Click the **Manage** button next to your Kiloforge domain.
4. Scroll down slightly to the **Nameservers** section.
5. Click the dropdown menu (which probably says "Namecheap BasicDNS") and change it to **Custom DNS**.
6. Two input boxes will appear. **Paste the first two AWS nameservers** you copied from Route 53.
7. Click **ADD NAMESERVER** to add two more boxes, and paste the final two AWS nameservers.
8. **CRITICAL:** Click the small **green checkmark button** on the right side of the Nameservers row to save!

_Note: Namecheap will warn you that DNS propagation can take up to 48 hours. In reality, it usually takes 15-30 minutes._

## Step 4: Deploy your Code to Vercel

If you haven't deployed the code yet, do so now:

1. Push your `kiloforge_site` folder to a new repository on **GitHub**.
2. Log into **Vercel** (https://vercel.com).
3. Click **Add New...** -> **Project**.
4. Import your newly created GitHub repository.
5. Vercel will auto-detect Next.js. Leave everything default and click **Deploy**.
6. Vercel will give you a temporary URL (like `kiloforge-site-xxxx.vercel.app`).

## Step 5: Connect Vercel to Route 53

1. In your Vercel project dashboard, go to **Settings** -> **Domains**.
2. Type in your custom domain (e.g., `kiloforge.com`) and click **Add**.
3. Choose the option to explicitly add `kiloforge.com` and redirect `www.kiloforge.com` to it.
4. Vercel will now show an "Invalid Configuration" error because your DNS parameters aren't set in AWS yet.
5. Vercel will give you **two records** to create:
   - An **A Record** (e.g., Name: `@`, Value: `76.76.21.21`).
   - A **CNAME Record** (e.g., Name: `www`, Value: `cname.vercel-dns.com`).

## Step 6: Create the Records in AWS

1. Go back to your **Hosted Zone in AWS Route 53**.
2. Click **Create record**.

**Create the A Record:**

1. Leave the **Record name** blank (this implies the root domain, like `@`).
2. Set the **Record type** to **A - Routes traffic to an IPv4 address**.
3. In the **Value** box, paste the IP address Vercel gave you (usually `76.76.21.21`).
4. Click **Create records**.

**Create the CNAME Record:**

1. Click **Create record** again.
2. In the **Record name** box, type `www`.
3. Set the **Record type** to **CNAME - Routes traffic to another domain name**.
4. In the **Value** box, paste `cname.vercel-dns.com` (or the specific CNAME Vercel provided).
5. Click **Create records**.

## Step 7: Wait for SSL Generation

Go back to **Settings -> Domains** in Vercel.
Within a few minutes, Vercel will detect the new AWS Route 53 records. The "Invalid Configuration" errors will disappear, the UI will update to say "Valid Configuration," and Vercel will automatically provision a free SSL/TLS Certificate for you.

Your Kiloforge site will now be live on your custom domain!
