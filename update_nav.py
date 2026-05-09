import os
import glob
import re
import shutil

v2_path = r"e:\HNU uni\Semester 4\Internet Technology\Project\V2"

html_files = glob.glob(os.path.join(v2_path, "*", "index.html"))

old_nav = """        <nav class="nav-links">
            <a href="../home/index.html" data-ar="الرئيسية" data-en="Home">الرئيسية</a>
            <a href="../login_register/index.html" data-ar="دخول/تسجيل" data-en="Login/Register">دخول/تسجيل</a>
        </nav>"""

new_nav = """        <nav class="nav-links" style="display: flex; align-items: center; gap: 10px;">
            <a href="../home/index.html" data-ar="الرئيسية" data-en="Home">الرئيسية</a>
            <a href="../profile/index.html" data-ar="الملف الشخصي" data-en="Profile">الملف الشخصي</a>
            <button onclick="toggleLang(event)" class="btn btn-secondary" style="padding: 5px 10px; font-size: 14px;" data-ar="English" data-en="العربية">English</button>
            <a href="../login_register/index.html" data-ar="دخول/تسجيل" data-en="Login/Register">دخول/تسجيل</a>
        </nav>"""

for file in html_files:
    if os.path.dirname(file) == v2_path:
        continue # Skip router index.html
        
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace nav
    if old_nav in content:
        content = content.replace(old_nav, new_nav)
    
    # Remove profile and language from sidebar
    content = re.sub(r'^\s*<li><a href="\.\./profile/index\.html".*?</li>\r?\n', '', content, flags=re.MULTILINE)
    content = re.sub(r'^\s*<li><a href="\.\./language_settings/index\.html".*?</li>\r?\n', '', content, flags=re.MULTILINE)
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

post_details = os.path.join(v2_path, "post_details")
lang_settings = os.path.join(v2_path, "language_settings")

if os.path.exists(post_details):
    shutil.rmtree(post_details)
    print("Deleted post_details")
if os.path.exists(lang_settings):
    shutil.rmtree(lang_settings)
    print("Deleted language_settings")

print("Done updating HTML files.")
