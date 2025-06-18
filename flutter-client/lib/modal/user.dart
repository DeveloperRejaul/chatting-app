class UserModal {
  final int id;
  final String name;
  final String email;

  UserModal({
    required this.id,
    required this.name,
    required this.email,
  });
}

class LoginModal {
  final String message;
  final int id;
  final String name;
  final String email;
  final String password;
  final String token;

  LoginModal({
    required this.message,
    required this.id,
    required this.name,
    required this.email,
    required this.password,
    required this.token,
  });

  @override
  String toString() {
    return 'LoginModal(message: $message, id: $id, name: $name, email: $email, password: $password, token: $token)';
  }
}
