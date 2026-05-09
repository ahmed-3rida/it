import os

base_path = r"e:\HNU uni\Semester 4\Internet Technology\Project\V2"

pages = [
    "home",
    "login_register",
    "search",
    "create_post",
    "post_details",
    "chat",
    "edit_profile",
    "profile",
    "admin_dashboard",
    "categories",
    "user_dashboard",
    "moderation",
    "create_thread",
    "notifications",
    "trending",
    "polls",
    "ads",
    "language_settings",
    "privacy_settings"
]

html_template = """<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{Title} - Social Forum</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <div class="logo">Social Forum</div>
        <nav>
            <a href="../home/index.html">الرئيسية</a>
            <a href="../categories/index.html">الأقسام</a>
            <a href="../trending/index.html">الشائع</a>
            <a href="../login_register/index.html">تسجيل الدخول</a>
        </nav>
    </header>
    
    <main>
        <h1>صفحة {Title}</h1>
        <p>محتوى صفحة {Title} سيتم إضافته هنا. تم بناء هذه الصفحة باستخدام أساسيات HTML و CSS و JavaScript.</p>
    </main>

    <footer>
        <p>&copy; 2026 Social Forum Project</p>
    </footer>

    <script src="script.js"></script>
</body>
</html>
"""

css_template = """/* CSS لصفحة {Title} */
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f0f2f5;
    color: #333;
}

header {
    background-color: #ff4500; /* لون شبيه بـ Reddit */
    color: white;
    padding: 15px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

header .logo {
    font-size: 24px;
    font-weight: bold;
}

nav a {
    color: white;
    margin: 0 10px;
    text-decoration: none;
    font-size: 16px;
}

nav a:hover {
    text-decoration: underline;
}

main {
    padding: 20px;
    max-width: 800px;
    margin: 20px auto;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    min-height: 400px;
}

h1 {
    color: #ff4500;
}

footer {
    text-align: center;
    padding: 10px;
    background-color: #333;
    color: white;
    position: fixed;
    bottom: 0;
    width: 100%;
}
"""

js_template = """// JavaScript لصفحة {Title}
document.addEventListener("DOMContentLoaded", function() {
    console.log("تم تحميل صفحة {Title} بنجاح.");
});
"""

os.makedirs(base_path, exist_ok=True)

for page in pages:
    page_dir = os.path.join(base_path, page)
    os.makedirs(page_dir, exist_ok=True)
    
    # تحويل اسم المجلد إلى عنوان مقروء
    title = page.replace('_', ' ').title()
    if page == "home":
        title = "الرئيسية"
    elif page == "login_register":
        title = "تسجيل الدخول وإنشاء حساب"
    elif page == "search":
        title = "البحث"
    elif page == "create_post":
        title = "إنشاء منشور"
    elif page == "post_details":
        title = "تفاصيل المنشور والتعليقات"
    elif page == "chat":
        title = "المحادثات"
    elif page == "edit_profile":
        title = "تعديل الملف الشخصي"
    elif page == "profile":
        title = "الملف الشخصي"
    elif page == "admin_dashboard":
        title = "لوحة تحكم الإدارة"
    elif page == "categories":
        title = "أقسام المنتدى"
    elif page == "user_dashboard":
        title = "لوحة تحكم المستخدم"
    elif page == "moderation":
        title = "الإبلاغ والحظر"
    elif page == "create_thread":
        title = "إنشاء نقاش جديد"
    elif page == "notifications":
        title = "الإشعارات"
    elif page == "trending":
        title = "المواضيع الشائعة"
    elif page == "polls":
        title = "الاستطلاعات"
    elif page == "ads":
        title = "الإعلانات"
    elif page == "language_settings":
        title = "إعدادات اللغة"
    elif page == "privacy_settings":
        title = "إعدادات الخصوصية"
    
    with open(os.path.join(page_dir, "index.html"), "w", encoding="utf-8") as f:
        f.write(html_template.replace("{Title}", title))
        
    with open(os.path.join(page_dir, "style.css"), "w", encoding="utf-8") as f:
        f.write(css_template.replace("{Title}", title))
        
    with open(os.path.join(page_dir, "script.js"), "w", encoding="utf-8") as f:
        f.write(js_template.replace("{Title}", title))

print("تم إنشاء هيكل المشروع بنجاح!")
