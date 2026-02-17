# Supabase Email Confirmation Fix

## Problem
Email confirmation links were redirecting to `localhost:3000` instead of production URL, causing ERR_CONNECTION_REFUSED errors.

## Solution Implemented
1. Created `/app/auth/callback/route.ts` - handles email confirmation tokens
2. Updated sign-up redirect URL to use the callback route

## Required Supabase Configuration

You MUST configure these settings in your Supabase dashboard:

### 1. Site URL Configuration
**Location:** Supabase Dashboard → Authentication → URL Configuration

Set **Site URL** to:
```
https://www.dcsam.co.za
```

### 2. Redirect URLs (Whitelist)
**Location:** Supabase Dashboard → Authentication → URL Configuration → Redirect URLs

Add these allowed redirect URLs:
```
https://www.dcsam.co.za/auth/callback
https://www.dcsam.co.za/client-portal/dashboard
https://www.dcsam.co.za/client-portal/auth/login
http://localhost:3000/auth/callback (for local development)
http://localhost:3000/client-portal/dashboard (for local development)
```

### 3. Email Templates (Optional but Recommended)
**Location:** Supabase Dashboard → Authentication → Email Templates

For **Confirm signup** template, ensure the confirmation link uses:
```
{{ .SiteURL }}/auth/callback?token_hash={{ .TokenHash }}&type=email
```

This will automatically use your configured Site URL instead of localhost.

## Testing the Fix

1. Sign up with a new email address
2. Check your email for the confirmation link
3. The link should now point to `https://www.dcsam.co.za/auth/callback?code=...`
4. Clicking it should successfully confirm your email and redirect to the dashboard

## Troubleshooting

If emails still use localhost:
- Double-check the Site URL in Supabase Dashboard
- Make sure you saved the changes
- Try signing up with a new email to generate a fresh confirmation link
- Check spam/junk folder for the confirmation email

## Environment Variables Required

Ensure these are set in your Vercel project:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (for server-side operations)
