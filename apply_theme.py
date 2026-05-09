import os

base_path = r"e:\HNU uni\Semester 4\Internet Technology\Project\V2"

# قوالب الأساس
html_top = """<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title} - Social Forum</title>
    <!-- استدعاء ملف الستايل المشترك (الدارك ثيم) وملف الصفحة -->
    <link rel="stylesheet" href="../shared.css">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header class="navbar">
        <div class="logo">Social Forum</div>
        <div class="search-bar" style="display:flex; flex-grow:1; max-width:400px; margin: 0 20px;">
            <input type="text" placeholder="البحث في المنتدى..." onclick="window.location.href='../search/index.html'">
        </div>
        <nav class="nav-links">
            <a href="../home/index.html">الرئيسية</a>
            <a href="../login_register/index.html">دخول/تسجيل</a>
        </nav>
    </header>

    <div class="layout-container">
        <!-- القائمة الجانبية الموحدة لربط كل الصفحات ببعضها -->
        <aside class="global-sidebar">
            <h3>القائمة الرئيسية</h3>
            <ul>
                <li><a href="../home/index.html">الرئيسية (Home)</a></li>
                <li><a href="../search/index.html">البحث (Search)</a></li>
                <li><a href="../create_post/index.html">إنشاء منشور (Post)</a></li>
                <li><a href="../chat/index.html">المحادثات (Chat)</a></li>
                <li><a href="../profile/index.html">الملف الشخصي (Profile)</a></li>
                <li><a href="../categories/index.html">الأقسام (Categories)</a></li>
                <li><a href="../trending/index.html">الشائع (Trending)</a></li>
                <li><a href="../polls/index.html">الاستطلاعات (Polls)</a></li>
            </ul>
            <h3 style="margin-top:20px;">الإعدادات والتحكم</h3>
            <ul>
                <li><a href="../user_dashboard/index.html">لوحة تحكمي (Dashboard)</a></li>
                <li><a href="../admin_dashboard/index.html">لوحة الإدارة (Admin)</a></li>
                <li><a href="../moderation/index.html">الإبلاغ والحظر (Mod)</a></li>
                <li><a href="../create_thread/index.html">نقاش جديد (Thread)</a></li>
                <li><a href="../notifications/index.html">الإشعارات (Notif)</a></li>
                <li><a href="../ads/index.html">الإعلانات (Ads)</a></li>
                <li><a href="../language_settings/index.html">اللغة (Language)</a></li>
                <li><a href="../privacy_settings/index.html">الخصوصية (Privacy)</a></li>
            </ul>
        </aside>

        <!-- محتوى الصفحة المتغير -->
        <main class="main-content">
"""

html_bottom = """        </main>
    </div>
    <!-- ملف الجافاسكريبت المشترك (للغة والإعجاب) وملف الصفحة -->
    <script src="../shared.js"></script>
    <script src="script.js"></script>
</body>
</html>"""

# محتوى الصفحات
pages = {
    "home": {
        "title": "الرئيسية",
        "html": """<div class="container-box" style="display:flex; gap:10px; cursor:pointer;" onclick="window.location.href='../create_post/index.html'">
            <input type="text" placeholder="بم تفكر؟..." readonly style="width:100%; padding:10px; border-radius:4px; border:1px solid var(--border-color); background:var(--bg-color); color:var(--text-primary);">
            <button class="btn">نشر</button>
        </div>

        <!-- منشور نصي عادي -->
        <div class="post">
            <div class="post-header">
                <img src="https://via.placeholder.com/40" alt="Avatar">
                <div>
                    <div class="username">أحمد محمد</div>
                    <div class="time">قبل ساعتين</div>
                </div>
            </div>
            <h2 class="accent-title">الذكاء الاصطناعي في 2026</h2>
            <p>مجال الذكاء الاصطناعي يتطور بشكل مخيف ومبهر في نفس الوقت. ما رأيكم؟</p>
            <div class="post-actions">
                <button class="action-btn" onclick="toggleLikeGlobal(this)">👍 أعجبني (<span class="like-count">15</span>)</button>
                <button class="action-btn" onclick="window.location.href='../post_details/index.html'">💬 تعليق (3)</button>
            </div>
        </div>

        <!-- منشور مع صورة -->
        <div class="post">
            <div class="post-header">
                <img src="https://via.placeholder.com/40" alt="Avatar">
                <div>
                    <div class="username">سارة علي</div>
                    <div class="time">قبل 5 ساعات</div>
                </div>
            </div>
            <h2 class="accent-title">صورة من رحلتي الأخيرة</h2>
            <p>الطبيعة خلابة جداً اليوم!</p>
            <img src="https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=600&q=80" alt="Nature" style="width:100%; border-radius:8px; margin-top:10px;">
            <div class="post-actions">
                <button class="action-btn" onclick="toggleLikeGlobal(this)">👍 أعجبني (<span class="like-count">120</span>)</button>
                <button class="action-btn" onclick="window.location.href='../post_details/index.html'">💬 تعليق (42)</button>
            </div>
        </div>

        <!-- منشور مع فيديو -->
        <div class="post">
            <div class="post-header">
                <img src="https://via.placeholder.com/40" alt="Avatar">
                <div>
                    <div class="username">تكنولوجيا اليوم</div>
                    <div class="time">قبل يوم</div>
                </div>
            </div>
            <h2 class="accent-title">فيديو تعليمي: كيف تبدأ في البرمجة</h2>
            <video controls style="width:100%; border-radius:8px; margin-top:10px; background:#000;">
                <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
                متصفحك لا يدعم تشغيل الفيديو.
            </video>
            <div class="post-actions">
                <button class="action-btn" onclick="toggleLikeGlobal(this)">👍 أعجبني (<span class="like-count">85</span>)</button>
                <button class="action-btn" onclick="window.location.href='../post_details/index.html'">💬 تعليق (12)</button>
            </div>
        </div>

        <!-- منشور استطلاع رأي (Poll) -->
        <div class="post">
            <div class="post-header">
                <img src="https://via.placeholder.com/40" alt="Avatar">
                <div>
                    <div class="username">عمر خالد</div>
                    <div class="time">قبل يومين</div>
                </div>
            </div>
            <h2 class="accent-title">ما هو نظام التشغيل المفضل لديك؟</h2>
            <form onsubmit="event.preventDefault(); this.innerHTML='<div style=margin-top:10px;color:var(--accent)>تم تسجيل تصويتك!</div>';">
                <div style="margin-bottom: 10px;"><label><input type="radio" name="os" required> Windows</label></div>
                <div style="margin-bottom: 10px;"><label><input type="radio" name="os"> Linux</label></div>
                <div style="margin-bottom: 10px;"><label><input type="radio" name="os"> macOS</label></div>
                <button type="submit" class="btn" style="margin-top:10px;">تصويت</button>
            </form>
            <div class="post-actions">
                <button class="action-btn" onclick="toggleLikeGlobal(this)">👍 أعجبني (<span class="like-count">200</span>)</button>
                <button class="action-btn" onclick="window.location.href='../post_details/index.html'">💬 تعليق (55)</button>
            </div>
        </div>
        """
    },
    "post_details": {
        "title": "تفاصيل المنشور",
        "html": """<div class="post">
            <div class="post-header">
                <img src="https://via.placeholder.com/40" alt="Avatar">
                <div>
                    <div class="username">أحمد محمد</div>
                    <div class="time">قبل ساعتين</div>
                </div>
            </div>
            <h2 class="accent-title">الذكاء الاصطناعي في 2026</h2>
            <p>مجال الذكاء الاصطناعي يتطور بشكل مخيف ومبهر في نفس الوقت. هل تعتقدون أنه سيحل محل المبرمجين؟</p>
            <div class="post-actions">
                <button class="action-btn" onclick="toggleLikeGlobal(this)">👍 أعجبني (<span class="like-count">15</span>)</button>
            </div>
        </div>
        
        <div class="container-box" style="margin-top: 20px;">
            <h3 class="accent-title">التعليقات</h3>
            <div class="form-group" style="display:flex; gap:10px;">
                <input type="text" id="commentText" placeholder="أضف تعليقاً..." style="flex-grow:1;">
                <button class="btn" onclick="addComment()">إضافة تعليق</button>
            </div>
            <div id="commentsList" style="margin-top:20px;">
                <div style="background: var(--bg-color); padding: 10px; margin-bottom: 10px; border-radius: 4px; border: 1px solid var(--border-color);">
                    <strong>سارة:</strong> مستحيل! سيبقى المبرمج هو من يوجه الذكاء الاصطناعي.
                </div>
            </div>
        </div>
        <script>
        function addComment() {
            let input = document.getElementById('commentText');
            if(input.value.trim() === '') return;
            let list = document.getElementById('commentsList');
            let div = document.createElement('div');
            div.style = 'background: var(--bg-color); padding: 10px; margin-bottom: 10px; border-radius: 4px; border: 1px solid var(--border-color);';
            div.innerHTML = '<strong style="color:var(--accent)">أنت:</strong> ' + input.value;
            list.prepend(div);
            input.value = '';
        }
        </script>
        """
    },
    "language_settings": {
        "title": "إعدادات اللغة",
        "html": """<div class="container-box">
            <h2 class="accent-title">إعدادات اللغة (Language Settings)</h2>
            <p>اختر اللغة المفضلة لواجهة المستخدم. سيتم تطبيق التغيير فوراً على جميع الصفحات.</p>
            <div class="form-group">
                <label>اختر اللغة</label>
                <select id="langSelect" onchange="changeLanguage(this.value)">
                    <option value="ar">العربية (Arabic) - RTL</option>
                    <option value="en">English (الإنجليزية) - LTR</option>
                </select>
            </div>
            <script>
                document.getElementById('langSelect').value = localStorage.getItem('site_lang') || 'ar';
            </script>
        </div>"""
    },
    "login_register": {
        "title": "دخول / تسجيل",
        "html": """<div class="container-box" style="max-width: 400px; margin: 0 auto;">
            <div style="display:flex; border-bottom:1px solid var(--border-color); margin-bottom:20px;">
                <button id="tab-login" class="btn" style="flex:1; border-radius:0; background:none; color:var(--accent); border-bottom:2px solid var(--accent);" onclick="showTab('login')">تسجيل الدخول</button>
                <button id="tab-register" class="btn" style="flex:1; border-radius:0; background:none; color:var(--text-secondary);" onclick="showTab('register')">إنشاء حساب</button>
            </div>
            
            <form id="form-login" onsubmit="event.preventDefault(); window.location.href='../home/index.html';">
                <div class="form-group"><label>البريد الإلكتروني</label><input type="email" required></div>
                <div class="form-group"><label>كلمة المرور</label><input type="password" required></div>
                <button type="submit" class="btn" style="width:100%;">دخول</button>
            </form>

            <form id="form-register" style="display:none;" onsubmit="event.preventDefault(); window.location.href='../home/index.html';">
                <div class="form-group"><label>اسم المستخدم</label><input type="text" required></div>
                <div class="form-group"><label>البريد الإلكتروني</label><input type="email" required></div>
                <div class="form-group"><label>كلمة المرور</label><input type="password" required></div>
                <button type="submit" class="btn" style="width:100%;">إنشاء حساب</button>
            </form>
            
            <script>
            function showTab(tab) {
                if(tab === 'login') {
                    document.getElementById('form-login').style.display = 'block';
                    document.getElementById('form-register').style.display = 'none';
                    document.getElementById('tab-login').style.color = 'var(--accent)';
                    document.getElementById('tab-login').style.borderBottom = '2px solid var(--accent)';
                    document.getElementById('tab-register').style.color = 'var(--text-secondary)';
                    document.getElementById('tab-register').style.borderBottom = 'none';
                } else {
                    document.getElementById('form-login').style.display = 'none';
                    document.getElementById('form-register').style.display = 'block';
                    document.getElementById('tab-register').style.color = 'var(--accent)';
                    document.getElementById('tab-register').style.borderBottom = '2px solid var(--accent)';
                    document.getElementById('tab-login').style.color = 'var(--text-secondary)';
                    document.getElementById('tab-login').style.borderBottom = 'none';
                }
            }
            </script>
        </div>"""
    },
    "create_post": {
        "title": "إنشاء منشور",
        "html": """<div class="container-box">
            <h2 class="accent-title">إنشاء منشور جديد</h2>
            <form onsubmit="event.preventDefault(); window.location.href='../home/index.html';">
                <div class="form-group">
                    <label>عنوان المنشور</label>
                    <input type="text" placeholder="اكتب عنواناً..." required>
                </div>
                <div class="form-group">
                    <label>المحتوى</label>
                    <textarea rows="5" placeholder="ماذا يدور في ذهنك؟"></textarea>
                </div>
                <div class="form-group">
                    <label>إرفاق وسائط (صورة / فيديو)</label>
                    <input type="file" accept="image/*,video/*">
                </div>
                <button type="submit" class="btn">نشر</button>
            </form>
        </div>"""
    },
    "search": {
        "title": "البحث",
        "html": """<div class="container-box">
            <h2 class="accent-title">البحث عن مستخدمين</h2>
            <div class="form-group">
                <input type="text" id="searchInput" placeholder="ابحث باسم المستخدم..." onkeyup="filterUsers()">
            </div>
            <div id="userList">
                <div class="user-card" style="display:flex; justify-content:space-between; align-items:center; padding:15px; border-bottom:1px solid var(--border-color);">
                    <div style="display:flex; gap:15px; align-items:center;">
                        <img src="https://via.placeholder.com/40" style="border-radius:50%;">
                        <span>أحمد محمد</span>
                    </div>
                    <button class="btn btn-secondary">متابعة</button>
                </div>
                <div class="user-card" style="display:flex; justify-content:space-between; align-items:center; padding:15px; border-bottom:1px solid var(--border-color);">
                    <div style="display:flex; gap:15px; align-items:center;">
                        <img src="https://via.placeholder.com/40" style="border-radius:50%;">
                        <span>سارة علي</span>
                    </div>
                    <button class="btn btn-secondary">متابعة</button>
                </div>
            </div>
            <script>
            function filterUsers() {
                let input = document.getElementById('searchInput').value.toLowerCase();
                let cards = document.getElementsByClassName('user-card');
                for(let card of cards) {
                    if(card.innerText.toLowerCase().includes(input)) card.style.display = 'flex';
                    else card.style.display = 'none';
                }
            }
            </script>
        </div>"""
    },
    "profile": {
        "title": "الملف الشخصي",
        "html": """<div class="container-box" style="text-align:center;">
            <img src="https://via.placeholder.com/120" style="border-radius:50%; margin-bottom:15px;">
            <h2 class="accent-title" style="margin-bottom:5px;">أحمد محمد</h2>
            <p style="color:var(--text-secondary); margin-top:0;">@ahmed_m</p>
            <p>مطور ويب مهتم بالتقنية.</p>
            <div style="margin:20px 0;">
                <span style="margin:0 10px;"><strong>150</strong> متابع</span>
                <span style="margin:0 10px;"><strong>50</strong> يُتابع</span>
            </div>
            <button class="btn" id="followBtn" onclick="toggleFollow()">متابعة</button>
            <a href="../edit_profile/index.html" class="btn btn-secondary">تعديل الملف</a>
            <script>
            function toggleFollow() {
                let btn = document.getElementById('followBtn');
                if(btn.innerText === 'متابعة') {
                    btn.innerText = 'إلغاء المتابعة'; btn.className = 'btn btn-secondary';
                } else {
                    btn.innerText = 'متابعة'; btn.className = 'btn';
                }
            }
            </script>
        </div>"""
    },
    "admin_dashboard": {
        "title": "لوحة الإدارة",
        "html": """<div class="container-box">
            <h2 class="accent-title">إحصائيات المنتدى</h2>
            <div style="display:flex; gap:20px;">
                <div style="flex:1; background:var(--bg-color); padding:20px; border-radius:8px; text-align:center; border:1px solid var(--border-color);">
                    <h3>المستخدمين</h3><h2 class="accent-title">1,250</h2>
                </div>
                <div style="flex:1; background:var(--bg-color); padding:20px; border-radius:8px; text-align:center; border:1px solid var(--border-color);">
                    <h3>المنشورات</h3><h2 class="accent-title">3,400</h2>
                </div>
                <div style="flex:1; background:var(--bg-color); padding:20px; border-radius:8px; text-align:center; border:1px solid var(--border-color);">
                    <h3>البلاغات النشطة</h3><h2 class="accent-title">12</h2>
                </div>
            </div>
        </div>"""
    }
}

# للقوائم التي لم أضف محتوى مخصص لها هنا، نضع محتوى افتراضي معتمداً على الثيم
basic_pages = ["chat", "edit_profile", "categories", "user_dashboard", "moderation", "create_thread", "notifications", "trending", "polls", "ads", "privacy_settings"]

for p in basic_pages:
    pages[p] = {
        "title": p.replace('_', ' ').title(),
        "html": f"""<div class="container-box">
            <h2 class="accent-title">صفحة {p}</h2>
            <p>هذا القالب جاهز لصفحة {p}. يعمل بالتوافق مع التنسيق الموحد والـ Dark Theme.</p>
        </div>"""
    }

for page_name, content in pages.items():
    page_dir = os.path.join(base_path, page_name)
    os.makedirs(page_dir, exist_ok=True)
    
    html_content = html_top.replace("{title}", content["title"]) + content["html"] + html_bottom
    
    with open(os.path.join(page_dir, "index.html"), "w", encoding="utf-8") as f:
        f.write(html_content)
        
    with open(os.path.join(page_dir, "style.css"), "w", encoding="utf-8") as f:
        f.write("/* Custom styles for this page (optional) */\n")

print("Project updated successfully with Dark Theme, Layout, and UX fixes.")
