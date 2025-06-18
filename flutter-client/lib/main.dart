import 'package:flutter/material.dart';
import 'package:flutter_chatting_app/pages/chat.dart';
import 'package:flutter_chatting_app/pages/home.dart';
import 'package:flutter_chatting_app/pages/login.dart';
import 'package:flutter_chatting_app/provider/user_provider.dart';
import 'package:provider/provider.dart';

void main() {
  runApp(ChangeNotifierProvider(
    create: (_) => UserProvider(),
    child: const MyApp(),
  ));
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      initialRoute: '/login',
      onGenerateRoute: (settings) {
        Widget page;
        switch (settings.name) {
          case '/login':
            page = const LoginScreen();
            break;
          case '/chat':
            final args = settings.arguments as Map<String, dynamic>;
            page = ChatScreen(
              id: args["id"],
              email: args["email"],
              name: args["name"],
            );
            break;
          case '/':
          default:
            page = const HomePage();
        }
        return PageRouteBuilder(
          pageBuilder: (context, animation, secondaryAnimation) => page,
          transitionsBuilder: (context, animation, secondaryAnimation, child) {
            const begin = Offset(1.0, 0.0);
            const end = Offset.zero;
            const curve = Curves.ease;
            final tween =
                Tween(begin: begin, end: end).chain(CurveTween(curve: curve));
            return SlideTransition(
              position: animation.drive(tween),
              child: child,
            );
          },
        );
      },
      theme: ThemeData(
        useMaterial3: true,
      ),
      debugShowCheckedModeBanner: false,
    );
  }
}
