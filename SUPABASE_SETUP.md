# إعداد Supabase للمنصة - دليل شامل

## 🚀 الخطوات المطلوبة لربط قاعدة البيانات

### 1. إنشاء مشروع Supabase جديد

1. اذهب إلى [supabase.com](https://supabase.com)
2. اضغط "Start your project"
3. سجل دخول أو أنشئ حساب جديد
4. اضغط "New Project"
5. اختر Organization أو أنشئ واحدة جديدة
6. املأ البيانات:
   - **Project Name**: `Talk Social Platform`
   - **Database Password**: اختر كلمة مرور قوية (احفظها!)
   - **Region**: اختر أقرب منطقة لك
7. اضغط "Create new project"
8. انتظر حتى يكتمل الإعداد (2-3 دقائق)

### 2. الحصول على بيانات الاتصال

بعد إنشاء المشروع:

1. اذهب إلى **Settings** > **API**
2. انسخ البيانات التالية:
   - **Project URL**: `https://your-project-id.supabase.co`
   - **anon public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### 3. إعداد Environment Variables

أنشئ ملف `.env.local` في جذر المشروع:

\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
\`\`\`

### 4. تشغيل SQL Scripts

في Supabase Dashboard:

1. اذهب إلى **SQL Editor**
2. شغل الملفات بالترتيب التالي:

#### أ) إعداد قاعدة البيانات الأساسية:
\`\`\`sql
-- انسخ والصق محتوى scripts/01-setup-database.sql
-- ثم اضغط RUN
\`\`\`

#### ب) إعداد سياسات الأمان:
\`\`\`sql
-- انسخ والصق محتوى scripts/02-setup-rls-policies.sql
-- ثم اضغط RUN
\`\`\`

#### ج) إعداد الدوال:
\`\`\`sql
-- انسخ والصق محتوى scripts/03-setup-functions.sql
-- ثم اضغط RUN
\`\`\`

#### د) إدراج البيانات الافتراضية:
\`\`\`sql
-- انسخ والصق محتوى scripts/04-insert-default-data.sql
-- ثم اضغط RUN
\`\`\`

#### هـ) إعداد التخزين:
\`\`\`sql
-- انسخ والصق محتوى scripts/05-setup-storage.sql
-- ثم اضغط RUN
\`\`\`

#### و) إعداد Real-time:
\`\`\`sql
-- انسخ والصق محتوى scripts/06-setup-realtime.sql
-- ثم اضغط RUN
\`\`\`

#### ز) إنشاء الحسابات الحقيقية:
\`\`\`sql
-- انسخ والصق محتوى scripts/07-create-real-account.sql
-- ثم اضغط RUN
\`\`\`

#### ح) إنشاء حساب @assem:
\`\`\`sql
-- انسخ والصق محتوى scripts/08-create-assem-account.sql
-- ثم اضغط RUN
\`\`\`

### 5. إعداد Authentication

في Supabase Dashboard:

1. اذهب إلى **Authentication** > **Settings**
2. في **General settings**:
   - ✅ Enable email confirmations
   - Site URL: `http://localhost:3000` (للتطوير)
   - Redirect URLs: `http://localhost:3000/auth/callback`

3. في **Email** tab:
   - ✅ Enable email provider
   - ✅ Confirm email
   - ✅ Secure email change

### 6. إعداد Storage

في Supabase Dashboard:

1. اذهب إلى **Storage**
2. تأكد من وجود buckets:
   - `avatars` (للصور الشخصية)
   - `banners` (لصور الغلاف)
   - `posts` (لصور المنشورات)

### 7. إعداد Real-time

في Supabase Dashboard:

1. اذهب إلى **Database** > **Replication**
2. تأكد من تفعيل Real-time للجداول:
   - ✅ `posts`
   - ✅ `comments`
   - ✅ `profiles`

### 8. إنشاء حساب @assem يدوياً

إذا لم يعمل SQL script:

1. اذهب إلى **Authentication** > **Users**
2. اضغط "Add user"
3. املأ البيانات:
   - **Email**: `assemsabry19@gmail.com`
   - **Password**: `AssemsAbry789$`
   - **Email Confirm**: ✅ Yes
4. اضغط "Create user"
5. انسخ User ID
6. اذهب إلى **Table Editor** > **profiles**
7. اضغط "Insert row"
8. املأ البيانات:
   - **id**: User ID المنسوخ
   - **username**: `assem`
   - **full_name**: `Assem Sabry`
   - **bio**: `AI Engineer & Founder of Talk 🚀`
   - **title**: `AI Engineer`
   - **verified**: `true`

### 9. اختبار الاتصال

1. شغل المشروع: `npm run dev`
2. اذهب إلى `http://localhost:3000`
3. جرب تسجيل الدخول بحساب @assem:
   - Email: `assemsabry19@gmail.com`
   - Password: `AssemsAbry789$`

### 10. استكشاف الأخطاء

#### مشكلة: "Supabase not configured"
- تأكد من وجود `.env.local`
- تأكد من صحة SUPABASE_URL و ANON_KEY
- أعد تشغيل الخادم

#### مشكلة: "Invalid login credentials"
- تأكد من إنشاء المستخدم في Authentication
- تأكد من تأكيد الإيميل
- تأكد من كلمة المرور

#### مشكلة: "Row Level Security"
- تأكد من تشغيل scripts/02-setup-rls-policies.sql
- تحقق من الصلاحيات في Table Editor

#### مشكلة: "Table doesn't exist"
- تأكد من تشغيل scripts/01-setup-database.sql
- تحقق من وجود الجداول في Table Editor

### 11. للإنتاج (Production)

عند النشر:

1. غير Site URL إلى domain الحقيقي
2. أضف domain إلى Redirect URLs
3. فعل SMTP مخصص للإيميلات
4. أضف SUPABASE_SERVICE_ROLE_KEY للعمليات الخادم

## ✅ التحقق من نجاح الإعداد

إذا تم كل شيء بنجاح، ستتمكن من:

- ✅ تسجيل الدخول بحساب @assem
- ✅ رؤية المنشورات في الصفحة الرئيسية
- ✅ إنشاء منشورات جديدة
- ✅ رؤية البروفايل
- ✅ تسجيل حسابات جديدة مع OTP حقيقي

## 🆘 المساعدة

إذا واجهت مشاكل:

1. تحقق من Console في المتصفح للأخطاء
2. تحقق من Logs في Supabase Dashboard
3. تأكد من تشغيل جميع SQL Scripts
4. تأكد من إعدادات Authentication
\`\`\`

```plaintext file=".env.example"
# Supabase Configuration
# احصل على هذه القيم من Supabase Dashboard > Settings > API

# Project URL - عنوان مشروعك في Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co

# Anon Key - المفتاح العام للوصول لقاعدة البيانات
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Service Role Key (اختياري - للعمليات الخادم فقط)
# SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# ملاحظات مهمة:
# 1. أنشئ ملف .env.local (وليس .env) في جذر المشروع
# 2. لا تشارك هذه المفاتيح مع أحد
# 3. للإنتاج، استخدم environment variables في منصة النشر
# 4. NEXT_PUBLIC_ يعني أن المتغير سيكون مرئي في المتصفح

# مثال للقيم الحقيقية:
# NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
# NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTY0NjA2NzI2MCwiZXhwIjoxOTYxNjQzMjYwfQ.example-signature-here
