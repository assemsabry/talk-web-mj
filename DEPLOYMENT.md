# Talk App Deployment Guide

## 1. إنشاء مشروع Supabase

1. اذهب إلى [supabase.com](https://supabase.com)
2. أنشئ حساب جديد أو سجل دخول
3. اضغط "New Project"
4. اختر Organization واكتب اسم المشروع "talk-app"
5. اختر كلمة مرور قوية لقاعدة البيانات
6. اختر المنطقة الأقرب لك

## 2. تشغيل SQL Scripts

في Supabase Dashboard:
1. اذهب إلى SQL Editor
2. شغل الملفات بالترتيب:
   - `scripts/01-setup-database.sql`
   - `scripts/02-setup-rls-policies.sql`
   - `scripts/03-setup-functions.sql`
   - `scripts/04-insert-default-data.sql`
   - `scripts/05-setup-storage.sql`
   - `scripts/06-setup-realtime.sql`
   - `scripts/07-create-real-account.sql`

## 3. إعداد Storage

في Supabase Dashboard:
1. اذهب إلى Storage
2. تأكد من إنشاء Buckets:
   - `avatars` (public)
   - `banners` (public)
   - `posts` (public)

## 4. الحصول على Environment Variables

من Supabase Dashboard > Settings > API:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 5. النشر على Netlify

1. اذهب إلى [netlify.com](https://netlify.com)
2. اربط حسابك بـ GitHub
3. اختر المشروع
4. أضف Environment Variables:
   \`\`\`
   NEXT_PUBLIC_SUPABASE_URL=your_url_here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key_here
   \`\`\`
5. اضغط Deploy

## 6. إنشاء حسابك الحقيقي

1. اذهب إلى الموقع المنشور
2. اضغط Sign Up
3. استخدم البيانات:
   - Email: assemsabry19@gmail.com
   - Password: AssemsAbry789$
   - Username: assem
   - Full Name: Assem Sabry
   - Title: AI Engineer

## 7. تفعيل PWA

بعد النشر، المستخدمون يمكنهم:
1. فتح الموقع في المتصفح
2. اضغط "Add to Home Screen"
3. استخدام التطبيق كـ Native App

## 8. اختبار الميزات

- ✅ تسجيل الدخول/إنشاء حساب
- ✅ رفع صور البروفايل والبانر
- ✅ إنشاء منشورات مع صور
- ✅ نظام التصويت
- ✅ التحديثات الفورية
- ✅ الإشعارات
- ✅ PWA Installation

المنصة جاهزة للاستخدام! 🚀
