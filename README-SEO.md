# DCSA Website SEO Setup Guide

This guide will help you complete the SEO setup for maximum visibility on Google, Bing, and Edge search engines.

## 1. Bing Webmaster Tools Setup

### Step 1: Verify Your Site with Bing
1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters/)
2. Sign in with your Microsoft account
3. Add your site: `https://dcsam.co.za`
4. Choose verification method:
   - **Option A: Meta Tag** - Copy the verification code and replace `PLEASE_ADD_YOUR_BING_VERIFICATION_CODE_HERE` in `app/layout.tsx` (line with `msvalidate.01`)
   - **Option B: XML File** - Update the code in `public/BingSiteAuth.xml`

### Step 2: Submit Your Sitemap
1. In Bing Webmaster Tools, go to Sitemaps
2. Submit: `https://dcsam.co.za/sitemap.xml`
3. Bing will automatically crawl your pages

### Step 3: Enable IndexNow for Instant Indexing
1. Generate an IndexNow API key at [IndexNow](https://www.indexnow.org/)
2. Update `app/api/indexnow/route.ts` with your key
3. Create a text file at `public/your-indexnow-key.txt` with your key
4. Whenever you update content, call the IndexNow API to notify search engines instantly

## 2. Google Search Console Setup

### Step 1: Verify Your Site
1. Go to [Google Search Console](https://search.google.com/search-console/)
2. Add property: `https://dcsam.co.za`
3. Verification is already done via the meta tag in `app/layout.tsx`
4. Click "Verify"

### Step 2: Submit Your Sitemap
1. In Google Search Console, go to Sitemaps
2. Submit: `https://dcsam.co.za/sitemap.xml`

## 3. Social Media Verification

### Facebook Business Page
- Your Facebook page is linked: `https://www.facebook.com/DebtClearDCSA`
- Ensure you claim your business page in Facebook Business Manager
- Add your website URL in your Facebook page settings

### TikTok
- Your TikTok is linked: `https://www.tiktok.com/@dcsa_debtclearsa`
- Add your website link to your TikTok bio

## 4. Ongoing SEO Best Practices

### Content Updates
- Update your blog regularly with financial tips and debt counselling advice
- Use exact-match keywords in titles (Bing values this)
- Keep content original, relevant, and helpful

### Technical SEO
- Monitor site speed in both Google and Bing tools
- Ensure all images have alt text
- Keep internal linking strong
- Use descriptive anchor text for links

### Social Signals
- Share content on Facebook and TikTok regularly
- Engage with comments and messages
- Social shares help Bing rankings significantly

### Backlinks
- Get listed in South African business directories
- Partner with financial education websites
- Seek .gov or .edu mentions when possible

## 5. Monitoring and Analytics

### Track Your Progress
- Google Search Console: Monitor queries, clicks, impressions
- Bing Webmaster Tools: Check crawl errors, indexation status
- Use both platforms' "URL Inspection" to verify pages are indexed

### Key Metrics to Watch
- Organic traffic growth
- Keyword rankings for "debt clear", "debt help", "DCSA"
- Click-through rates from search results
- Crawl errors or indexation issues

## 6. Contact Information

If you need help with SEO setup:
- Email: sam@dcsam.co.za
- Phone: +27 71 900 6298

---

Last Updated: 2025
