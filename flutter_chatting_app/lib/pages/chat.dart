import 'package:flutter/material.dart';
import 'package:flutter_chatting_app/modal/message.dart';
import 'package:flutter_chatting_app/provider/user_provider.dart';
import 'package:provider/provider.dart';

class ChatScreen extends StatefulWidget {
  final int id;
  final String name;
  final String email;

  const ChatScreen({
    super.key,
    required this.id,
    required this.name,
    required this.email,
  });

  @override
  State<ChatScreen> createState() => _ChatScreenState();
}

class _ChatScreenState extends State<ChatScreen> {
  final TextEditingController _controller = TextEditingController();
  final List<ChatMessage> _messages = [];
  late UserProvider userProvider;
  bool _socketInitialized = false;

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();

    // Avoid reinitializing socket listener on widget rebuild
    if (!_socketInitialized) {
      userProvider = Provider.of<UserProvider>(context, listen: false);

      userProvider.socket?.on("send", (data) {
        print(data);
        final message = data["message"];
        setState(() {
          _messages.add(ChatMessage(text: message, isMe: false));
        });
      });

      _socketInitialized = true;
    }
  }

  void _sendMessage() {
    final text = _controller.text.trim();
    if (text.isNotEmpty) {
      setState(() {
        setState(() {
          _messages.add(ChatMessage(text: text, isMe: true)); // sender = me
          _controller.clear();
        });
        _controller.clear();
      });

      final senderId = userProvider.user?.id;
      final socket = userProvider.socket;
      final resiverId = widget.id;

      socket?.emit("send", {
        "message": text,
        "id": resiverId,
        "senderId": senderId,
        "files": null
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Chat'),
      ),
      body: Column(
        children: [
          Expanded(
            child: ListView.builder(
                padding: const EdgeInsets.all(8),
                itemCount: _messages.length,
                itemBuilder: (context, index) {
                  final msg = _messages[index];
                  return Align(
                    alignment:
                        msg.isMe ? Alignment.centerRight : Alignment.centerLeft,
                    child: Container(
                      margin: const EdgeInsets.symmetric(vertical: 4),
                      padding: const EdgeInsets.all(12),
                      decoration: BoxDecoration(
                        color: msg.isMe
                            ? Colors.green.shade100
                            : Colors.blue.shade100,
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: Text(msg.text),
                    ),
                  );
                }),
          ),
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Row(
              children: [
                Expanded(
                  child: TextField(
                    controller: _controller,
                    decoration: const InputDecoration(
                      hintText: 'Type a message',
                      border: OutlineInputBorder(),
                    ),
                    onSubmitted: (_) => _sendMessage(),
                  ),
                ),
                const SizedBox(width: 8),
                IconButton(
                  icon: const Icon(Icons.send),
                  onPressed: _sendMessage,
                  color: Colors.blue,
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
