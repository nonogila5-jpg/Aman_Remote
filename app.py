from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
import os

app = Flask(__name__)
# تفعيل CORS للسماح للمتصفح بالاتصال بالسيرفر دون قيود أمنية متضاربة
CORS(app)

# قاعدة بيانات بسيطة للمستخدمين
USERS = {"aman": "1234"}

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    u = data.get('username')
    p = data.get('password')
    if USERS.get(u) == p:
        print(f"✅ دخول ناجح: {u}")
        return jsonify({"status": "success", "username": u}), 200
    return jsonify({"status": "error", "message": "بيانات الدخول غير صحيحة"}), 401

@app.route('/order', methods=['POST'])
def handle_order():
    data = request.json
    product = data.get('product')
    price = data.get('price')
    user = data.get('user')
    gps = data.get('location')
    time_now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    # صياغة الطلب ليظهر في Termux ويُحفظ في الملف
    order_entry = f"[{time_now}] العميل: {user} | المنتج: {product} | السعر: {price} | الموقع: {gps}\n"
    
    print(f"📦 طلب جديد مستلم: {product} من {user}")

    try:
        with open("orders.txt", "a", encoding="utf-8") as file:
            file.write(order_entry)
        return jsonify({"status": "success", "message": "تم تسجيل الطلب في نظام Aman بنجاح!"}), 200
    except Exception as e:
        print(f"❌ خطأ في الحفظ: {e}")
        return jsonify({"status": "error", "message": "فشل حفظ الطلب محلياً"}), 500

if __name__ == '__main__':
    # يعمل على جميع واجهات الشبكة بالبورت 5000
    app.run(host='0.0.0.0', port=5000)