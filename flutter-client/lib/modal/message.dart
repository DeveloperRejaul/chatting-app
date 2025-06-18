class ChatMessage {
  final String text;
  final bool isMe; // true if the message was sent by current user

  ChatMessage({required this.text, required this.isMe});
}
