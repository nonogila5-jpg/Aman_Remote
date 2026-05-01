// live_screen.dart
import 'package:flutter/material.dart';

class LiveScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      appBar: AppBar(title: Text("بث مباشر - أمان"), backgroundColor: Colors.purple),
      body: Column(
        children: [
          // شاشة الفيديو
          Expanded(
            flex: 2,
            child: Container(
              color: Colors.grey[900],
              child: Center(child: Icon(Icons.play_circle_outline, size: 100, color: Colors.white)),
            ),
          ),
          // منطقة الدردشة
          Expanded(
            flex: 1,
            child: Container(
              padding: EdgeInsets.all(10),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.only(topLeft: Radius.circular(20), topRight: Radius.circular(20)),
              ),
              child: Column(
                children: [
                  Expanded(child: Text("الدردشة المباشرة تبدأ هنا...")),
                  TextField(decoration: InputDecoration(hintText: "أرسل تعليقاً...")),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
