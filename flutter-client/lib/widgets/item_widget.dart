import 'package:flutter/material.dart';

class ItemWidget extends StatelessWidget {
  final String name;
  final String email;
  final int id;

  const ItemWidget({
    super.key,
    required this.name,
    required this.email,
    required this.id,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 2,
      margin: const EdgeInsets.symmetric(horizontal: 16),
      child: ListTile(
        leading: CircleAvatar(
          backgroundColor: Colors.blue.shade100,
          child: Text(
            name.isNotEmpty ? name[0].toUpperCase() : '?',
            style: const TextStyle(color: Colors.blue),
          ),
        ),
        title: Text(
          name,
          maxLines: 1,
          overflow: TextOverflow.ellipsis,
          style: const TextStyle(
            fontWeight: FontWeight.bold,
          ),
        ),
        subtitle: Text(
          email,
          maxLines: 1,
          overflow: TextOverflow.ellipsis,
        ),
        trailing: const Icon(
          Icons.chat_bubble_outline,
        ),
        onTap: () {
          Navigator.pushNamed(
            context,
            '/chat',
            arguments: {
              "id": id,
              "name": name,
              "email": email,
            },
          );
        },
      ),
    );
  }
}
