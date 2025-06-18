import 'package:flutter/material.dart';
import 'package:flutter_chatting_app/modal/user.dart';
import 'package:socket_io_client/socket_io_client.dart' as IO;

class UserProvider extends ChangeNotifier {
  LoginModal? _user;
  IO.Socket? _socket;

  LoginModal? get user => _user;
  IO.Socket? get socket => _socket;

  void setUser(LoginModal user) {
    _user = user;
    notifyListeners();
  }

  void setSocket(IO.Socket socket) {
    _socket = socket;
    notifyListeners();
  }

  void clearUser() {
    _user = null;
    _socket = null;
  }
}
