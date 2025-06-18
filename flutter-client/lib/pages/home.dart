import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_chatting_app/api/user.dart';
import 'package:flutter_chatting_app/modal/user.dart';
import 'package:flutter_chatting_app/provider/user_provider.dart';
import 'package:flutter_chatting_app/secret.dart';
import 'package:flutter_chatting_app/widgets/item_widget.dart';
import 'package:provider/provider.dart';
import 'package:socket_io_client/socket_io_client.dart' as IO;

class HomePage extends StatefulWidget {
  const HomePage({super.key});
  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  List<UserModal> users = [];
  bool isLoading = false;
  late UserProvider userProvider;

  @override
  void initState() {
    super.initState();
    getUsers();

    // Use addPostFrameCallback to access context safely after build
    WidgetsBinding.instance.addPostFrameCallback((_) {
      userProvider = Provider.of<UserProvider>(context, listen: false);
      final me = userProvider.user;

      if (me == null) return; // Guard against null user

      IO.Socket socket = IO.io(
        baseUrl,
        IO.OptionBuilder()
            .setAuth({"token": me.token}).setTransports(['websocket']).build(),
      );
      socket.connect(); // Connect the socket
      socket.onConnect((_) => print('connect'));
      socket.onDisconnect((_) => print('disconnect'));
      userProvider.setSocket(socket);
    });
  }

  @override
  void dispose() {
    userProvider.socket?.disconnect();
    userProvider.clearUser();
    super.dispose();
  }

  /// Fetches the list of users from the API and updates the state.
  /// Sets [isLoading] to true before fetching, then updates [users] with the
  ///fetched data and sets [isLoading] to false after completion.
  Future<void> getUsers() async {
    setState(() {
      isLoading = true;
    });

    List<UserModal> data = await UserApi.fetchUsers();
    setState(() {
      users = data;
      isLoading = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    final me = Provider.of<UserProvider>(context).user;

    return PopScope(
      canPop: false,
      onPopInvokedWithResult: (didPop, result) {
        if (!didPop) SystemNavigator.pop();
      },
      child: Scaffold(
        appBar: AppBar(
          automaticallyImplyLeading: false,
          backgroundColor: Colors.white,
          title: Text("Flutter chatting App"),
        ),
        backgroundColor: Colors.white,
        body: Center(
          child: isLoading
              ? const CircularProgressIndicator()
              : users.isEmpty
                  ? const Text("No users found.")
                  : ListView.separated(
                      padding: const EdgeInsets.only(bottom: 16.0, top: 16.0),
                      itemCount: users.length,
                      separatorBuilder: (context, index) {
                        return SizedBox(height: 8);
                      },
                      itemBuilder: (context, index) {
                        final user = users[index];
                        if (me != null && me.email == user.email) {
                          return const SizedBox.shrink();
                        }
                        return ItemWidget(
                            name: user.name, email: user.email, id: user.id);
                      },
                    ),
        ),
      ),
    );
  }
}
