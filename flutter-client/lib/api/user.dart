import 'dart:convert';
import 'package:flutter_chatting_app/secret.dart';
import 'package:http/http.dart' as http;
import 'package:flutter_chatting_app/modal/user.dart';

class UserApi {
  /// Fetches a list of users from the API.
  /// Sends a GET request to `$baseUrl/users`.
  /// Returns a [List] of [UserModal] objects if successful, or an empty list if an error occurs.
  /// Throws an [Exception] if the response status code is not 200.
  static Future<List<UserModal>> fetchUsers() async {
    try {
      final response = await http.get(Uri.parse('$baseUrl/users'));

      if (response.statusCode != 200) {
        throw Exception('Failed to load users');
      }
      final List<dynamic> data = json.decode(response.body);

      return data
          .map((json) => UserModal(
                id: json['id'],
                name: json['name'],
                email: json['email'],
              ))
          .toList();
    } catch (e) {
      // Handle or log error as needed
      print('Error fetching users: $e');
      return [];
    }
  }

  /// Logs in a user with the provided [email] and [password].
  /// Sends a POST request to `$baseUrl/login` with a JSON body containing the email and password.
  /// Returns a [LoginModal] object if the login is successful.
  /// Throws an [Exception] if the response status code is not 200.
  /// Returns an empty [LoginModal] (cast from `{}`) if an error occurs.
  static Future<LoginModal?> loginUser({
    required String email,
    required String password,
  }) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/login'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({"email": email, "password": password}),
      );

      if (response.statusCode != 200) {
        throw Exception('login failed');
      }
      final Map<String, dynamic> data = json.decode(response.body);
      final user = LoginModal(
        message: data['message'],
        id: data['id'],
        name: data['name'],
        email: data['email'],
        password: data['password'],
        token: data['token'],
      );
      return user;
    } catch (e) {
      print(e);
      return null;
    }
  }
}
