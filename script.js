document.addEventListener('deviceready', function() {
    const statusText = document.getElementById('status-text');
    const listBtn = document.getElementById('btn-list-apps');
    const container = document.getElementById('app-list-container');

    statusText.innerText = "النظام جاهز (Cordova Active)";

    listBtn.onclick = function() {
        statusText.innerText = "جاري قراءة أعماق الحزم...";
        container.innerHTML = '<div style="text-align:center; padding:20px;">انتظر لحظة...</div>';

        // استخدام الإضافة لجلب التطبيقات الحقيقية
        if (window.plugins && window.plugins.Applist) {
            window.plugins.Applist.getAppList(function(apps) {
                statusText.innerText = "تم استخراج " + apps.length + " مسار APK";
                container.innerHTML = "";

                apps.forEach(function(app) {
                    const div = document.createElement('div');
                    div.className = "app-item";
                    const path = app.apkPath || "/data/app/" + app.package + "/base.apk";
                    
                    div.innerHTML = `
                        <div class="app-info">
                            <strong>${app.name}</strong>
                            <small>${app.package}</small>
                            <code class="apk-path">${path}</code>
                        </div>
                    `;
                    container.appendChild(div);
                });
            }, function(error) {
                alert("خطأ في الجلب: " + error);
            });
        } else {
            alert("تنبيه: أنت تتصفح من المتصفح. ميزة استخراج APK تعمل فقط بعد تحويل الملف لـ APK حقيقي.");
            statusText.innerText = "بانتظار بناء الـ APK...";
        }
    };
}, false);
