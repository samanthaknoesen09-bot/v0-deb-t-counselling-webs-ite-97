# Google Calendar Integration Setup Guide

Your booking system is now configured to integrate with Google Calendar. Follow these steps to complete the setup:

## Current Implementation

The booking system currently:
- Creates appointment details with date, time, and client information
- Generates Google Calendar event links that open automatically
- Sends notifications to the counsellor's calendar
- Provides confirmation to both counsellor and client via sam@dcsam.co.za

## Test the Current Setup

1. Go to your website booking section
2. Fill out the appointment form with test data
3. Submit the booking
4. A Google Calendar window will open automatically
5. Click "Save" to add the appointment to your calendar

## For Full Automation (Optional)

To automatically add appointments without manual confirmation:

### Option 1: Google Calendar API (Recommended)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google Calendar API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs: `https://dcsam.vercel.app/api/calendar/callback`
6. Download credentials JSON
7. Add environment variables to your Vercel project:
   ```
   GOOGLE_CALENDAR_CLIENT_ID=your_client_id
   GOOGLE_CALENDAR_CLIENT_SECRET=your_client_secret
   GOOGLE_CALENDAR_REFRESH_TOKEN=your_refresh_token
   ```

### Option 2: Zapier Integration (Easier)

1. Create a free [Zapier](https://zapier.com) account
2. Create a new Zap:
   - Trigger: Webhook (catches booking data)
   - Action: Google Calendar - Create Event
3. Configure to send calendar events to your designated calendar
4. Update the booking API to send data to Zapier webhook

### Option 3: Current Link Method (No Setup Needed)

The current implementation opens Google Calendar in a browser window for manual addition. This works immediately with no additional setup required.

## Testing Checklist

- [ ] Book a test appointment
- [ ] Verify Google Calendar link opens
- [ ] Check that appointment details are correct
- [ ] Confirm email notification arrives at designated calendar
- [ ] Test from mobile device
- [ ] Verify calendar reminder notifications work

## Support

If you need help with the full API integration, the current link-based system works reliably as a manual backup until you're ready to implement full automation.
