import 'package:flutter/material.dart';
import 'live_screen.dart';

class HomeScreen extends StatelessWidget {
  final String username;
  HomeScreen({required this.username});

  final List<Map<String, String>> rooms = [
    {"name": "بث تقني مباشر", "host": "أمان 1"},
    {"name": "دردشة عامة", "host": "مستخدم A"},
    {"name": "عرض منتجات إلكترونية", "host": "متجر أمان"},
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("مرحباً $username"),
        backgroundColor: Colors.purple,
      ),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: Text("غرف البث المباشر المتاحة", style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
          ),
          Expanded(
            child: ListView.builder(
              itemCount: rooms.length,
              itemBuilder: (context, index) {
                return Card(
                  margin: EdgeInsets.symmetric(horizontal: 15, vertical: 8),
                  child: ListTile(
                    leading: CircleAvatar(backgroundColor: Colors.purple, child: Icon(Icons.live_tv, color: Colors.white)),
                    title: Text(rooms[index]['name']!),
                    subtitle: Text("المضيف: ${rooms[index]['host']}"),
                    trailing: Icon(Icons.arrow_forward_ios),
                    onTap: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(builder: (context) => LiveScreen()),
                      );
                    },
                  ),
                );
              },
            ),
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          // هنا يتم إضافة كود إنشاء بث جديد
        },
        child: Icon(Icons.add),
        backgroundColor: Colors.purple,
      ),
    );
  }
}
