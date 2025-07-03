# Supabase Setup Guide for Talk Social Platform

## 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Create a new organization or select existing
4. Create a new project with name "talk-social-platform"
5. Choose a region close to your users
6. Set a strong database password

## 2. Configure Authentication

### Email Authentication Setup

1. Go to **Authentication > Settings**
2. Enable **Email** provider
3. Configure **Site URL**: 
   - Development: `http://localhost:3000`
   - Production: `https://your-domain.com`
4. Add **Redirect URLs**:
   - `http://localhost:3000/auth/callback`
   - `https://your-domain.com/auth/callback`

### Email Templates

1. Go to **Authentication > Email Templates**
2. Customize the **Confirm signup** template:
   \`\`\`html
   <h2>Confirm your signup</h2>
   <p>Follow this link to confirm your account:</p>
   <p><a href="{{ .ConfirmationURL }}">Confirm your account</a></p>
   <p>Or enter this code in the app: <strong>{{ .Token }}</strong></p>
   \`\`\`

### SMTP Configuration (Optional)

For production, configure custom SMTP:
1. Go to **Settings > Auth > SMTP Settings**
2. Enable custom SMTP
3. Configure your email provider (Gmail, SendGrid, etc.)

## 3. Database Setup

### Run SQL Scripts

Execute these scripts in **SQL Editor** in order:

1. `scripts/01-setup-database.sql` - Create tables
2. `scripts/02-setup-rls-policies.sql` - Set up security
3. `scripts/03-setup-functions.sql` - Create functions
4. `scripts/04-insert-default-data.sql` - Add sample data
5. `scripts/05-setup-storage.sql` - Configure file storage
6. `scripts/06-setup-realtime.sql` - Enable real-time
7. `scripts/07-create-real-account.sql` - Create Talk account
8. `scripts/08-create-assem-account.sql` - Create @assem account

### Create @assem Account

The script `08-create-assem-account.sql` creates the @assem account with:
- **Email**: assemsabry19@gmail.com
- **Password**: AssemsAbry789$
- **Username**: assem
- **Verified**: true

## 4. Storage Configuration

1. Go to **Storage**
2. Create buckets:
   - `avatars` (public)
   - `banners` (public)
   - `posts` (public)
   - `videos` (public)

## 5. Real-time Configuration

1. Go to **Database > Replication**
2. Enable replication for tables:
   - `posts`
   - `comments`
   - `likes`
   - `notifications`

## 6. Environment Variables

Create `.env.local` file:

\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
\`\`\`

Get these values from **Settings > API**

## 7. Test Authentication

1. Try signing up with a real email
2. Check email for verification code
3. Complete the signup process
4. Test login with @assem account:
   - Email: assemsabry19@gmail.com
   - Password: AssemsAbry789$

## 8. Production Deployment

### Netlify Configuration

1. Set environment variables in Netlify dashboard
2. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
3. Add domain to Supabase redirect URLs

### Domain Configuration

1. Update Supabase **Site URL** to your domain
2. Add production redirect URLs
3. Update email templates with production URLs

## 9. Email Deliverability

### For Production

1. Configure custom SMTP with a reliable provider
2. Set up SPF, DKIM, and DMARC records
3. Use a dedicated sending domain
4. Monitor email delivery rates

### Recommended Email Providers

- **SendGrid** - Good free tier, reliable
- **Mailgun** - Developer-friendly
- **Amazon SES** - Cost-effective for high volume
- **Postmark** - Excellent deliverability

## 10. Security Checklist

- [ ] RLS policies enabled on all tables
- [ ] API keys properly configured
- [ ] CORS settings configured
- [ ] Rate limiting enabled
- [ ] Email verification required
- [ ] Strong password requirements
- [ ] Secure redirect URLs only

## Troubleshooting

### Email Not Sending

1. Check SMTP configuration
2. Verify email templates
3. Check spam folder
4. Test with different email providers

### Authentication Issues

1. Verify redirect URLs
2. Check browser console for errors
3. Ensure environment variables are set
4. Test in incognito mode

### Database Connection Issues

1. Check RLS policies
2. Verify API keys
3. Check network connectivity
4. Review database logs

## Support

For issues:
1. Check Supabase documentation
2. Review error logs in Supabase dashboard
3. Test with Supabase CLI locally
4. Contact Supabase support if needed
