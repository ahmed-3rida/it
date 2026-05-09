import os

base_path = r"e:\HNU uni\Semester 4\Internet Technology\Project\V2"

# Templates
html_head = """<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title} - Social Forum</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header class="navbar">
        <div class="logo">Social Forum</div>
        <nav class="nav-links">
            <a href="../home/index.html">الرئيسية</a>
            <a href="../categories/index.html">الأقسام</a>
            <a href="../profile/index.html">الملف الشخصي</a>
            <a href="../login_register/index.html">خروج</a>
        </nav>
    </header>
    <main>
"""

html_foot = """    </main>
    <script src="script.js"></script>
</body>
</html>"""

css_common = """@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700&display=swap');
body { font-family: 'Tajawal', sans-serif; margin: 0; padding: 0; background-color: #dae0e6; color: #1a1a1b; }
a { text-decoration: none; color: inherit; }
.navbar { background-color: #ffffff; padding: 15px 20px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
.navbar .logo { font-size: 24px; font-weight: bold; color: #ff4500; }
.nav-links a { font-size: 16px; font-weight: bold; margin: 0 10px; transition: color 0.3s; }
.nav-links a:hover { color: #ff4500; }
.container { max-width: 800px; margin: 20px auto; padding: 20px; background: white; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); min-height: 400px; }
h1, h2, h3 { color: #ff4500; }
.btn { background: #ff4500; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; font-family: 'Tajawal', sans-serif; }
.btn:hover { background: #e03d00; }
.form-group { margin-bottom: 15px; }
.form-group label { display: block; margin-bottom: 5px; font-weight: bold; }
.form-group input, .form-group textarea, .form-group select { width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px; font-family: 'Tajawal', sans-serif; box-sizing: border-box; }
"""

# Pages Dictionary
pages_content = {
    "search": {
        "title": "البحث",
        "html": """<div class="container">
    <h2>البحث عن مستخدمين</h2>
    <div class="form-group">
        <input type="text" id="searchInput" placeholder="ابحث باسم المستخدم..." onkeyup="filterUsers()">
    </div>
    <div class="user-list" id="userList">
        <div class="user-card" style="display: flex; align-items: center; justify-content: space-between; padding: 15px; border: 1px solid #eee; margin-bottom: 10px; border-radius: 4px;">
            <div style="display: flex; align-items: center; gap: 15px;">
                <img src="https://via.placeholder.com/50" alt="Avatar" style="border-radius: 50%;">
                <div>
                    <h3 style="margin: 0; color: #1a1a1b;">أحمد محمد</h3>
                    <p style="margin: 0; color: #888;">@ahmed_m</p>
                </div>
            </div>
            <button class="btn">متابعة</button>
        </div>
        <div class="user-card" style="display: flex; align-items: center; justify-content: space-between; padding: 15px; border: 1px solid #eee; margin-bottom: 10px; border-radius: 4px;">
            <div style="display: flex; align-items: center; gap: 15px;">
                <img src="https://via.placeholder.com/50" alt="Avatar" style="border-radius: 50%;">
                <div>
                    <h3 style="margin: 0; color: #1a1a1b;">سارة علي</h3>
                    <p style="margin: 0; color: #888;">@sara_ali</p>
                </div>
            </div>
            <button class="btn">متابعة</button>
        </div>
    </div>
</div>""",
        "css": css_common,
        "js": """function filterUsers() {
    let input = document.getElementById('searchInput').value.toLowerCase();
    let cards = document.getElementsByClassName('user-card');
    for (let i = 0; i < cards.length; i++) {
        let name = cards[i].innerText.toLowerCase();
        if (name.includes(input)) {
            cards[i].style.display = 'flex';
        } else {
            cards[i].style.display = 'none';
        }
    }
}"""
    },
    "create_post": {
        "title": "إنشاء منشور",
        "html": """<div class="container">
    <h2>إنشاء منشور جديد</h2>
    <form onsubmit="event.preventDefault(); alert('تم النشر بنجاح!'); window.location.href='../home/index.html';">
        <div class="form-group">
            <label>عنوان المنشور</label>
            <input type="text" placeholder="اكتب عنواناً جذاباً..." required>
        </div>
        <div class="form-group">
            <label>المحتوى</label>
            <textarea rows="5" placeholder="ماذا يدور في ذهنك؟" required></textarea>
        </div>
        <div class="form-group">
            <label>إرفاق صورة أو فيديو</label>
            <input type="file" accept="image/*,video/*" id="mediaUpload">
        </div>
        <button type="submit" class="btn">نشر</button>
    </form>
</div>""",
        "css": css_common,
        "js": "// صفحة إنشاء المنشور"
    },
    "post_details": {
        "title": "تفاصيل المنشور",
        "html": """<div class="container">
    <div class="post">
        <h2>ما هو رأيكم في تقنيات الذكاء الاصطناعي؟</h2>
        <p>الذكاء الاصطناعي يتطور بسرعة كبيرة، هل تعتقدون أنه سيسيطر على وظائف المستقبل؟</p>
        <div style="margin-top: 15px; border-top: 1px solid #eee; padding-top: 10px;">
            <button class="btn" id="likeBtn" onclick="toggleLike()">👍 أعجبني (<span id="likeCount">15</span>)</button>
        </div>
    </div>
    
    <div style="margin-top: 30px;">
        <h3>التعليقات</h3>
        <div class="form-group">
            <textarea id="commentText" rows="3" placeholder="أضف تعليقاً..."></textarea>
            <button class="btn" onclick="addComment()" style="margin-top: 10px;">إضافة تعليق</button>
        </div>
        <div id="commentsList">
            <div style="background: #f9f9f9; padding: 10px; margin-bottom: 10px; border-radius: 4px; border: 1px solid #eee;">
                <strong>محمد:</strong> أعتقد أنه سيخلق وظائف جديدة!
            </div>
        </div>
    </div>
</div>""",
        "css": css_common,
        "js": """function toggleLike() {
    let span = document.getElementById('likeCount');
    let count = parseInt(span.innerText);
    span.innerText = count + 1;
}
function addComment() {
    let text = document.getElementById('commentText').value;
    if (text.trim() === '') return;
    let list = document.getElementById('commentsList');
    let div = document.createElement('div');
    div.style = 'background: #f9f9f9; padding: 10px; margin-bottom: 10px; border-radius: 4px; border: 1px solid #eee;';
    div.innerHTML = '<strong>أنت:</strong> ' + text;
    list.prepend(div);
    document.getElementById('commentText').value = '';
}"""
    },
    "chat": {
        "title": "المحادثات",
        "html": """<div class="container" style="display: flex; height: 500px; padding: 0; overflow: hidden; max-width: 900px;">
    <div style="width: 30%; background: #f0f0f0; border-left: 1px solid #ccc; overflow-y: auto;">
        <div style="padding: 15px; border-bottom: 1px solid #ddd; font-weight: bold; cursor: pointer; background: #e0e0e0;">أحمد محمد</div>
        <div style="padding: 15px; border-bottom: 1px solid #ddd; cursor: pointer;">سارة علي</div>
    </div>
    <div style="width: 70%; display: flex; flex-direction: column;">
        <div style="padding: 15px; background: #fff; border-bottom: 1px solid #ccc; font-weight: bold;">أحمد محمد</div>
        <div id="chatMessages" style="flex-grow: 1; padding: 15px; overflow-y: auto; background: #fafafa; display: flex; flex-direction: column; gap: 10px;">
            <div style="align-self: flex-start; background: #e1ffc7; padding: 8px 12px; border-radius: 10px;">مرحباً، كيف حالك؟</div>
            <div style="align-self: flex-end; background: #fff; border: 1px solid #ddd; padding: 8px 12px; border-radius: 10px;">أهلاً، أنا بخير الحمد لله.</div>
        </div>
        <div style="padding: 15px; background: #fff; border-top: 1px solid #ccc; display: flex;">
            <input type="text" id="msgInput" style="flex-grow: 1; padding: 10px; border: 1px solid #ccc; border-radius: 4px; font-family: 'Tajawal', sans-serif;" placeholder="اكتب رسالة...">
            <button class="btn" onclick="sendMessage()" style="margin-right: 10px;">إرسال</button>
        </div>
    </div>
</div>""",
        "css": css_common,
        "js": """function sendMessage() {
    let input = document.getElementById('msgInput');
    let text = input.value;
    if (text.trim() === '') return;
    let messages = document.getElementById('chatMessages');
    let div = document.createElement('div');
    div.style = 'align-self: flex-end; background: #fff; border: 1px solid #ddd; padding: 8px 12px; border-radius: 10px;';
    div.innerText = text;
    messages.appendChild(div);
    input.value = '';
    messages.scrollTop = messages.scrollHeight;
}"""
    },
    "edit_profile": {
        "title": "تعديل الملف الشخصي",
        "html": """<div class="container">
    <h2>تعديل الملف الشخصي</h2>
    <form onsubmit="event.preventDefault(); alert('تم حفظ التعديلات بنجاح!');">
        <div style="text-align: center; margin-bottom: 20px;">
            <img src="https://via.placeholder.com/100" alt="Avatar" style="border-radius: 50%;">
            <div class="form-group" style="margin-top: 10px;">
                <input type="file" accept="image/*">
            </div>
        </div>
        <div class="form-group">
            <label>اسم المستخدم</label>
            <input type="text" value="أحمد محمد">
        </div>
        <div class="form-group">
            <label>نبذة عني (Bio)</label>
            <textarea rows="3">مطور ويب محب للتكنولوجيا والذكاء الاصطناعي.</textarea>
        </div>
        <button type="submit" class="btn">حفظ التعديلات</button>
    </form>
</div>""",
        "css": css_common,
        "js": ""
    },
    "profile": {
        "title": "الملف الشخصي",
        "html": """<div class="container">
    <div style="text-align: center; padding-bottom: 20px; border-bottom: 1px solid #eee; margin-bottom: 20px;">
        <img src="https://via.placeholder.com/120" alt="Avatar" style="border-radius: 50%;">
        <h2 style="margin: 10px 0 5px 0;">أحمد محمد</h2>
        <p style="color: #666; margin: 0 0 10px 0;">@ahmed_m</p>
        <p>مطور ويب محب للتكنولوجيا والذكاء الاصطناعي.</p>
        <div style="margin: 15px 0;">
            <span style="margin: 0 10px;"><strong>120</strong> متابِع</span>
            <span style="margin: 0 10px;"><strong>45</strong> يُتابع</span>
        </div>
        <button class="btn" id="followBtn" onclick="toggleFollow()">متابعة</button>
        <a href="../edit_profile/index.html" class="btn" style="background: #7f8c8d;">تعديل الملف</a>
    </div>
    <div>
        <h3>المنشورات</h3>
        <div style="padding: 15px; border: 1px solid #eee; border-radius: 4px; margin-bottom: 15px;">
            <h4 style="margin: 0 0 10px 0; color: #1a1a1b;">أول منشور لي!</h4>
            <p style="margin: 0;">أهلاً بالجميع في هذا المنتدى الرائع.</p>
        </div>
    </div>
</div>""",
        "css": css_common,
        "js": """function toggleFollow() {
    let btn = document.getElementById('followBtn');
    if(btn.innerText === 'متابعة') {
        btn.innerText = 'إلغاء المتابعة';
        btn.style.background = '#7f8c8d';
    } else {
        btn.innerText = 'متابعة';
        btn.style.background = '#ff4500';
    }
}"""
    },
    "admin_dashboard": {
        "title": "الإدارة",
        "html": """<div class="container" style="max-width: 1000px;">
    <h2>لوحة تحكم الإدارة</h2>
    <div style="display: flex; gap: 20px; flex-wrap: wrap;">
        <div style="flex: 1; min-width: 200px; background: #f9f9f9; padding: 20px; border-radius: 8px; text-align: center; border: 1px solid #eee;">
            <h3 style="margin:0;">المستخدمين</h3>
            <p style="font-size: 24px; font-weight: bold; color: #ff4500; margin:10px 0 0 0;">1,250</p>
        </div>
        <div style="flex: 1; min-width: 200px; background: #f9f9f9; padding: 20px; border-radius: 8px; text-align: center; border: 1px solid #eee;">
            <h3 style="margin:0;">المنشورات</h3>
            <p style="font-size: 24px; font-weight: bold; color: #ff4500; margin:10px 0 0 0;">3,420</p>
        </div>
        <div style="flex: 1; min-width: 200px; background: #f9f9f9; padding: 20px; border-radius: 8px; text-align: center; border: 1px solid #eee;">
            <h3 style="margin:0;">البلاغات</h3>
            <p style="font-size: 24px; font-weight: bold; color: #ff4500; margin:10px 0 0 0;">12</p>
        </div>
    </div>
    <div style="margin-top: 30px;">
        <h3>إدارة الأقسام</h3>
        <button class="btn" style="margin-bottom: 15px;">إضافة قسم جديد</button>
        <table style="width: 100%; border-collapse: collapse; text-align: right;">
            <tr style="background: #eee;">
                <th style="padding: 10px; border: 1px solid #ccc;">اسم القسم</th>
                <th style="padding: 10px; border: 1px solid #ccc;">إجراءات</th>
            </tr>
            <tr>
                <td style="padding: 10px; border: 1px solid #ccc;">برمجة وتطوير</td>
                <td style="padding: 10px; border: 1px solid #ccc;"><button class="btn" style="padding: 5px 10px; background: #e74c3c;">حذف</button></td>
            </tr>
        </table>
    </div>
</div>""",
        "css": css_common,
        "js": ""
    },
    "categories": {
        "title": "الأقسام",
        "html": """<div class="container">
    <h2>أقسام المنتدى</h2>
    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 15px;">
        <div style="background: #f9f9f9; padding: 20px; text-align: center; border-radius: 8px; border: 1px solid #eee;">
            <h3 style="margin:0 0 10px 0;">💻 برمجة وتطوير</h3>
            <p style="margin:0 0 15px 0;">1,200 موضوع</p>
            <a href="../home/index.html" class="btn" style="display: inline-block;">تصفح</a>
        </div>
        <div style="background: #f9f9f9; padding: 20px; text-align: center; border-radius: 8px; border: 1px solid #eee;">
            <h3 style="margin:0 0 10px 0;">🎮 ألعاب فيديو</h3>
            <p style="margin:0 0 15px 0;">850 موضوع</p>
            <a href="../home/index.html" class="btn" style="display: inline-block;">تصفح</a>
        </div>
        <div style="background: #f9f9f9; padding: 20px; text-align: center; border-radius: 8px; border: 1px solid #eee;">
            <h3 style="margin:0 0 10px 0;">📱 هواتف ذكية</h3>
            <p style="margin:0 0 15px 0;">420 موضوع</p>
            <a href="../home/index.html" class="btn" style="display: inline-block;">تصفح</a>
        </div>
    </div>
</div>""",
        "css": css_common,
        "js": ""
    },
    "user_dashboard": {
        "title": "لوحة تحكمي",
        "html": """<div class="container">
    <h2>لوحة تحكم المستخدم</h2>
    <div style="display: flex; border-bottom: 2px solid #eee; margin-bottom: 20px;">
        <div style="padding: 10px 20px; font-weight: bold; border-bottom: 3px solid #ff4500; color: #ff4500; cursor: pointer;">منشوراتي</div>
        <div style="padding: 10px 20px; color: #888; cursor: pointer;">المحفوظات</div>
        <div style="padding: 10px 20px; color: #888; cursor: pointer;">أعجبني</div>
    </div>
    <div>
        <div style="padding: 15px; border: 1px solid #eee; border-radius: 4px; margin-bottom: 15px;">
            <h4 style="margin: 0 0 10px 0; color: #1a1a1b;">هل تعلم أن JavaScript تم ابتكارها في 10 أيام؟</h4>
            <p style="margin: 0 0 15px 0;">تم تصميم اللغة في عام 1995...</p>
            <button class="btn" style="background: #e74c3c; padding: 5px 10px;">حذف المنشور</button>
        </div>
    </div>
</div>""",
        "css": css_common,
        "js": ""
    },
    "moderation": {
        "title": "الإبلاغ",
        "html": """<div class="container">
    <h2>مركز الإبلاغ والحظر</h2>
    <div style="margin-bottom: 30px;">
        <h3>تقديم بلاغ</h3>
        <form onsubmit="event.preventDefault(); alert('تم إرسال البلاغ للإدارة.');">
            <div class="form-group">
                <label>رابط المنشور أو اسم المستخدم</label>
                <input type="text" placeholder="أدخل الرابط أو الاسم" required>
            </div>
            <div class="form-group">
                <label>سبب البلاغ</label>
                <select required>
                    <option value="">اختر سبباً...</option>
                    <option value="spam">محتوى مزعج (Spam)</option>
                    <option value="abuse">إساءة أو شتائم</option>
                    <option value="fake">حساب مزيف</option>
                </select>
            </div>
            <button type="submit" class="btn">إرسال البلاغ</button>
        </form>
    </div>
    <div>
        <h3>قائمة المحظورين</h3>
        <ul style="list-style: none; padding: 0;">
            <li style="display: flex; justify-content: space-between; align-items: center; padding: 10px; background: #f9f9f9; border: 1px solid #eee; border-radius: 4px;">
                <span>المستخدم المزعج (@spam_user)</span>
                <button class="btn" style="background: #7f8c8d; padding: 5px 10px;" onclick="this.parentElement.style.display='none'">إلغاء الحظر</button>
            </li>
        </ul>
    </div>
</div>""",
        "css": css_common,
        "js": ""
    },
    "create_thread": {
        "title": "إنشاء نقاش",
        "html": """<div class="container">
    <h2>إنشاء نقاش جديد</h2>
    <form onsubmit="event.preventDefault(); alert('تم إنشاء النقاش بنجاح!'); window.location.href='../home/index.html';">
        <div class="form-group">
            <label>اختر القسم</label>
            <select required>
                <option value="">اختر قسماً...</option>
                <option value="programming">برمجة وتطوير</option>
                <option value="gaming">ألعاب فيديو</option>
            </select>
        </div>
        <div class="form-group">
            <label>عنوان النقاش</label>
            <input type="text" placeholder="اكتب عنواناً يصف الموضوع..." required>
        </div>
        <div class="form-group">
            <label>المحتوى</label>
            <textarea rows="6" placeholder="اكتب تفاصيل النقاش هنا..." required></textarea>
        </div>
        <button type="submit" class="btn">نشر النقاش</button>
    </form>
</div>""",
        "css": css_common,
        "js": ""
    },
    "notifications": {
        "title": "الإشعارات",
        "html": """<div class="container">
    <h2>الإشعارات</h2>
    <div style="background: #fff3ed; padding: 15px; border-radius: 4px; border-right: 4px solid #ff4500; margin-bottom: 10px;">
        <strong>سارة علي</strong> قامت بالتعليق على منشورك "نصائح لتعلم البرمجة".
        <div style="font-size: 12px; color: #888; margin-top: 5px;">قبل 5 دقائق</div>
    </div>
    <div style="background: #fff; padding: 15px; border-radius: 4px; border: 1px solid #eee; margin-bottom: 10px;">
        <strong>أحمد محمد</strong> بدأ بمتابعتك.
        <div style="font-size: 12px; color: #888; margin-top: 5px;">قبل ساعة</div>
    </div>
    <div style="background: #fff; padding: 15px; border-radius: 4px; border: 1px solid #eee; margin-bottom: 10px;">
        حصل منشورك على <strong>15 إعجاب</strong>.
        <div style="font-size: 12px; color: #888; margin-top: 5px;">قبل يومين</div>
    </div>
</div>""",
        "css": css_common,
        "js": ""
    },
    "trending": {
        "title": "الشائع",
        "html": """<div class="container">
    <h2>المواضيع الشائعة (Trending)</h2>
    <div style="display: flex; flex-direction: column; gap: 10px;">
        <div style="padding: 15px; background: #fff; border: 1px solid #eee; border-radius: 4px; display: flex; align-items: center;">
            <div style="font-size: 24px; font-weight: bold; color: #ccc; margin-left: 15px;">#1</div>
            <div>
                <h3 style="margin: 0 0 5px 0;">الذكاء الاصطناعي</h3>
                <p style="margin: 0; color: #666;">5,420 منشور</p>
            </div>
        </div>
        <div style="padding: 15px; background: #fff; border: 1px solid #eee; border-radius: 4px; display: flex; align-items: center;">
            <div style="font-size: 24px; font-weight: bold; color: #ccc; margin-left: 15px;">#2</div>
            <div>
                <h3 style="margin: 0 0 5px 0;">أخبار التقنية</h3>
                <p style="margin: 0; color: #666;">3,100 منشور</p>
            </div>
        </div>
    </div>
</div>""",
        "css": css_common,
        "js": ""
    },
    "polls": {
        "title": "الاستطلاعات",
        "html": """<div class="container">
    <h2>الاستطلاعات والآراء</h2>
    <div style="padding: 20px; border: 1px solid #eee; border-radius: 8px;">
        <h3 style="margin-top:0;">ما هي لغة البرمجة المفضلة لديك؟</h3>
        <form id="pollForm" onsubmit="submitPoll(event)">
            <div style="margin-bottom: 10px;"><label><input type="radio" name="lang" required> Python</label></div>
            <div style="margin-bottom: 10px;"><label><input type="radio" name="lang"> JavaScript</label></div>
            <div style="margin-bottom: 10px;"><label><input type="radio" name="lang"> Java</label></div>
            <div style="margin-bottom: 10px;"><label><input type="radio" name="lang"> C#</label></div>
            <button type="submit" class="btn" style="margin-top: 15px;">تصويت</button>
        </form>
        <div id="pollResults" style="display: none; margin-top: 20px;">
            <h4>النتائج:</h4>
            <div style="margin-bottom: 10px;">Python (45%) <div style="background: #eee; height: 10px; border-radius: 5px;"><div style="background: #ff4500; height: 10px; border-radius: 5px; width: 45%;"></div></div></div>
            <div style="margin-bottom: 10px;">JavaScript (35%) <div style="background: #eee; height: 10px; border-radius: 5px;"><div style="background: #ff4500; height: 10px; border-radius: 5px; width: 35%;"></div></div></div>
        </div>
    </div>
</div>""",
        "css": css_common,
        "js": """function submitPoll(e) {
    e.preventDefault();
    document.getElementById('pollForm').style.display = 'none';
    document.getElementById('pollResults').style.display = 'block';
}"""
    },
    "ads": {
        "title": "الإعلانات",
        "html": """<div class="container">
    <h2>قسم الإعلانات</h2>
    <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #eee;">
        <h3 style="margin-top:0;">إحصائيات إعلاناتي</h3>
        <p>النقرات هذا الشهر: <strong>1,420</strong></p>
        <p>المشاهدات: <strong>12,500</strong></p>
        <p>الميزانية المتبقية: <strong style="color: green;">$150.00</strong></p>
    </div>
    <h3>إنشاء حملة إعلانية جديدة</h3>
    <form onsubmit="event.preventDefault(); alert('تم إرسال الإعلان للمراجعة!');">
        <div class="form-group">
            <label>عنوان الإعلان</label>
            <input type="text" placeholder="عنوان جذاب للمنتج..." required>
        </div>
        <div class="form-group">
            <label>رابط الإعلان</label>
            <input type="url" placeholder="https://..." required>
        </div>
        <div class="form-group">
            <label>الميزانية اليومية ($)</label>
            <input type="number" min="1" placeholder="مثال: 10" required>
        </div>
        <button type="submit" class="btn">إنشاء الإعلان</button>
    </form>
</div>""",
        "css": css_common,
        "js": ""
    },
    "language_settings": {
        "title": "اللغة",
        "html": """<div class="container">
    <h2>إعدادات اللغة</h2>
    <p>اختر اللغة المفضلة لواجهة المستخدم.</p>
    <form onsubmit="event.preventDefault(); alert('تم تغيير اللغة بنجاح!');">
        <div class="form-group">
            <label>اللغة (Language)</label>
            <select id="langSelect" required>
                <option value="ar" selected>العربية (Arabic)</option>
                <option value="en">English (الإنجليزية)</option>
                <option value="fr">Français (الفرنسية)</option>
            </select>
        </div>
        <button type="submit" class="btn">حفظ الإعدادات</button>
    </form>
</div>""",
        "css": css_common,
        "js": ""
    },
    "privacy_settings": {
        "title": "الخصوصية",
        "html": """<div class="container">
    <h2>إعدادات الخصوصية</h2>
    <form onsubmit="event.preventDefault(); alert('تم حفظ إعدادات الخصوصية!');">
        <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #eee; padding-bottom: 15px; margin-bottom: 15px;">
            <div>
                <strong style="display: block; margin-bottom: 5px;">حساب خاص</strong>
                <span style="font-size: 14px; color: #666;">سيتمكن المتابعون فقط من رؤية منشوراتك.</span>
            </div>
            <input type="checkbox" style="width: 20px; height: 20px; cursor: pointer;">
        </div>
        <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #eee; padding-bottom: 15px; margin-bottom: 15px;">
            <div>
                <strong style="display: block; margin-bottom: 5px;">السماح بالرسائل المباشرة</strong>
                <span style="font-size: 14px; color: #666;">السماح لأي شخص بإرسال رسائل خاصة إليك.</span>
            </div>
            <input type="checkbox" checked style="width: 20px; height: 20px; cursor: pointer;">
        </div>
        <button type="submit" class="btn" style="margin-top: 10px;">حفظ التغييرات</button>
    </form>
</div>""",
        "css": css_common,
        "js": ""
    }
}

for page_name, content in pages_content.items():
    page_dir = os.path.join(base_path, page_name)
    os.makedirs(page_dir, exist_ok=True)
    
    html_content = html_head.replace("{title}", content["title"]) + content["html"] + html_foot
    
    with open(os.path.join(page_dir, "index.html"), "w", encoding="utf-8") as f:
        f.write(html_content)
        
    with open(os.path.join(page_dir, "style.css"), "w", encoding="utf-8") as f:
        f.write(content["css"])
        
    with open(os.path.join(page_dir, "script.js"), "w", encoding="utf-8") as f:
        f.write(content["js"])

print("Done creating files.")
