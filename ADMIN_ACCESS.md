# Admin Portal Access

## Admin Login Credentials

To access the admin portal, you need to create an admin account:

### Step 1: Create Admin Account
1. Go to `/client-portal/auth/sign-up`
2. Create an account with email: **admin@dcsam.co.za**
3. Use a secure password (e.g., **Admin@DCSA2024**)
4. Complete the registration

### Step 2: Set Admin Role
After creating the account, you need to manually set the role to 'admin' in the database.

Run this SQL command in your Supabase SQL Editor:

```sql
UPDATE clients 
SET role = 'admin' 
WHERE email = 'admin@dcsam.co.za';
```

### Step 3: Access Admin Dashboard
Once the role is updated, log in at:
- **Admin Login URL**: `/client-portal/admin/login`
- **Email**: admin@dcsam.co.za
- **Password**: (whatever you set during registration)

## Admin Dashboard Features

The admin dashboard provides:
- View all client applications (Form 16, Credit Repair, Transfer Requests)
- View all uploaded documents
- See application statuses
- Access client contact information
- View submission timestamps

## Chat Transcript System

When clients use the "Chat with Us" feature in the header:
1. They can ask FAQ questions and get instant responses
2. If they need personal help, they can click "Chat with Counsellor"
3. This opens WhatsApp to **066 193 7596** (your number)
4. The full chat transcript is automatically sent to you in the WhatsApp message
5. You can see what questions they asked before contacting you directly

## Security Notes

- Admin role gives full read access to all client data
- Keep admin credentials secure
- Only share admin access with trusted staff
- Change password regularly
- Monitor admin activity through Supabase logs
