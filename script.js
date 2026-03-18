// مراجع العناصر
const fileInput = document.getElementById('file-input');
const statusBar = document.getElementById('status-bar');
const fileExplorerView = document.getElementById('file-explorer-view');
const filesListContent = document.getElementById('files-list-content');
const btnListApps = document.getElementById('btn-list-apps');
const appsListView = document.getElementById('apps-list-view');
const installedAppsContent = document.getElementById('installed-apps-content');

// 1. معالجة فك ضغط APK خارجي
fileInput.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    updateStatus("جاري تحليل ملف الـ APK...");
    filesListContent.innerHTML = "";
    
    try {
        const zip = new JSZip();
        const content = await zip.loadAsync(file);
        
        appsListView.style.display = "none";
        fileExplorerView.style.display = "block";

        Object.keys(content.files).forEach(filename => {
            const li = document.createElement('li');
            li.innerHTML = `<span>${filename}</span>`;
            
            // إضافة زر فتح للملفات المقروءة
            if (filename.endsWith('.xml') || filename.endsWith('.txt')) {
                const btn = document.createElement('button');
                btn.innerText = "عرض";
                btn.style.padding = "5px";
                btn.onclick = () => openFile(content, filename);
                li.appendChild(btn);
            }
            filesListContent.appendChild(li);
        });
        updateStatus("✅ تم التحليل بنجاح");
    } catch (err) {
        updateStatus("❌ فشل في فك الضغط");
    }
});

// 2. جلب تطبيقات الهاتف (محاكاة + استعداد للـ APK)
btnListApps.onclick = () => {
    fileExplorerView.style.display = "none";
    appsListView.style.display = "block";
    updateStatus("جاري جلب تطبيقات النظام...");

    // هذه القائمة ستظهر في Acode، وستتغير لقائمة حقيقية عند تحويلها لـ APK عبر Cordova
    const apps = [
        { name: "Aman Electronics", pkg: "com.aman.tech" },
        { name: "Pizza Project", pkg: "com.pizza.app" },
        { name: "WhatsApp", pkg: "com.whatsapp" }
    ];

    installedAppsContent.innerHTML = "";
    apps.forEach(app => {
        const div = document.createElement('div');
        div.className = "app-item";
        div.innerHTML = `
            <div><strong>${app.name}</strong><br><small>${app.pkg}</small></div>
            <button onclick="alert('طلب استخراج APK من النظام...')">استخراج</button>
        `;
        installedAppsListContent.appendChild(div);
    });
};

// 3. وظيفة فتح وقراءة الملفات
async function openFile(zip, filename) {
    const fileData = await zip.file(filename).async("string");
    document.getElementById('modal-filename').innerText = filename;
    document.getElementById('code-viewer').innerText = fileData;
    document.getElementById('code-modal').style.display = "block";
}

// إغلاق النافذة
document.querySelector('.close-btn').onclick = () => {
    document.getElementById('code-modal').style.display = "none";
};

function updateStatus(msg) {
    statusBar.innerText = "الحالة: " + msg;
}