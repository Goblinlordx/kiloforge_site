# Kiloforge Site

[![Deploy](https://github.com/Goblinlordx/kiloforge_site/actions/workflows/deploy.yml/badge.svg)](https://github.com/Goblinlordx/kiloforge_site/actions/workflows/deploy.yml)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Node.js](https://img.shields.io/badge/Node.js-22-339933?logo=node.js&logoColor=white)](https://nodejs.org)
[![AWS S3](https://img.shields.io/badge/AWS-S3_+_CloudFront-FF9900?logo=amazon-s3&logoColor=white)](https://aws.amazon.com/s3/)

Marketing and documentation site for [Kiloforge](https://github.com/kiloforge/kiloforge) — an orchestration platform for Claude Code swarms.

## Getting Started

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site locally.

## Deployment

Pushes to `main` automatically deploy via GitHub Actions:

1. Build static export with `next build`
2. Sync to S3
3. Invalidate CloudFront cache
