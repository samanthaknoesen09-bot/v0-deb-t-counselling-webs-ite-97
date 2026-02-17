# Zapier & ClickUp Integration Setup

## Overview
Your DCSA website now sends two types of submissions to Zapier, which then creates tasks in ClickUp.

## 1. Form 16 Application (Debt Review Application)

### Webhook Endpoint
`POST` to `ZAPIER_WEBHOOK_URL`

### Data Structure Sent
```json
{
  "type": "Form 16 - Debt Review Application",
  "clientType": "New Client",
  "status": "New Application",
  "submittedAt": "2024-01-15T10:30:00.000Z",
  
  "clientName": "John Doe",
  "email": "john@example.com",
  "phone": "0821234567",
  "idNumber": "8901015800080",
  
  "address": "123 Main St, Sandton, Johannesburg, 2196",
  
  "employer": "ABC Company",
  "occupation": "Software Developer",
  "employmentStartDate": "2020-01-15",
  
  "totalGrossIncome": 35000,
  "totalDeductions": 8000,
  "netIncome": 27000,
  "totalMonthlyCommitments": 15000,
  "totalDebtObligations": 250000,
  
  "fullApplication": { /* Complete form data */ },
  
  "source": "DCSA Website - Form 16",
  "priority": "High"
}
```

### Zapier Zap Configuration
**Trigger:** Catch Hook (Webhooks by Zapier)
**Actions:**
1. **Create Task in ClickUp**
   - List: "New Clients" or "Applications"
   - Task Name: `New Client: {{clientName}}`
   - Description: Include financial summary and contact details
   - Priority: High
   - Status: "New Application"
   - Assignee: Sam (sam@dcsam.co.za)
   - Custom Fields:
     - Client Type: "New Client"
     - Email: `{{email}}`
     - Phone: `{{phone}}`
     - ID Number: `{{idNumber}}`
     - Net Income: `{{netIncome}}`
     - Total Debt: `{{totalDebtObligations}}`

2. **Send Email (Already handled by website)**
   - The website automatically sends email to sam@dcsam.co.za
   - Email includes client summary and financial snapshot

## 2. Request Callback

### Webhook Endpoint
`POST` to `ZAPIER_WEBHOOK_URL`

### Data Structure Sent
```json
{
  "type": "Callback Request",
  "taskType": "Lead - Callback",
  "status": "New",
  "priority": "Normal",
  
  "clientName": "Jane Smith",
  "email": "jane@example.com",
  "phone": "0837654321",
  
  "preferredTime": "Morning (9am - 12pm)",
  "reason": "Debt Counselling Inquiry",
  
  "submittedAt": "2024-01-15T11:00:00.000Z",
  "source": "DCSA Website - Callback Request",
  
  "taskDescription": "Full formatted description with all details"
}
```

### Zapier Zap Configuration
**Trigger:** Catch Hook (Webhooks by Zapier)
**Actions:**
1. **Create Task in ClickUp**
   - List: "Leads" or "Callbacks"
   - Task Name: `Callback: {{clientName}} - {{preferredTime}}`
   - Description: `{{taskDescription}}`
   - Priority: Normal
   - Status: "New"
   - Assignee: Sales/Support Team
   - Custom Fields:
     - Contact Email: `{{email}}`
     - Contact Phone: `{{phone}}`
     - Preferred Time: `{{preferredTime}}`
     - Lead Source: "Website"

## Environment Variables Required

### Already Configured
- `ZAPIER_WEBHOOK_URL` ✓ (Configured)

### Needs Configuration
- `RESEND_API_KEY` - For sending emails to sam@dcsam.co.za

## Zapier Setup Steps

1. **Create Two Separate Zaps:**
   - Zap 1: Form 16 Application → ClickUp (New Clients)
   - Zap 2: Callback Request → ClickUp (Leads/Callbacks)

2. **For Each Zap:**
   - Trigger: Webhooks by Zapier → Catch Hook
   - Copy the webhook URL provided by Zapier
   - Set as `ZAPIER_WEBHOOK_URL` in your Vercel environment

3. **Test the Integration:**
   - Submit a test Form 16 from website
   - Submit a test callback request
   - Verify tasks appear in ClickUp with correct data

## Data Fields for ClickUp Custom Fields

### Form 16 / New Clients
- Client Type (dropdown)
- Email (email)
- Phone (phone)
- ID Number (text)
- Net Monthly Income (number)
- Total Debt Amount (number)
- Employment Status (dropdown)
- Application Date (date)

### Callback Requests
- Contact Email (email)
- Contact Phone (phone)
- Preferred Time (dropdown)
- Inquiry Reason (text)
- Lead Source (dropdown)
- Follow-up Date (date)

## Notes
- All submissions are timestamped in ISO format (South African timezone)
- Form 16 applications are marked as "High Priority" automatically
- Client data is validated before sending to Zapier
- Failed submissions are logged but don't prevent user confirmation
