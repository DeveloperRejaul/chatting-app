package com.example.android_chating_app.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import com.example.android_chating_app.R

data class ChatUser(val name: String, val email: String)

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun HomeScreen(navController: NavController) {

    val chatList = listOf(
        ChatUser("Alice", "alice@example.com"),
        ChatUser("Bob", "bob@example.com"),
        ChatUser("Charlie", "charlie@example.com"),
        ChatUser("Diana", "diana@example.com"),
        ChatUser("Eve", "eve@example.com"),
        ChatUser("Frank", "frank@example.com"),
        ChatUser("Grace", "grace@example.com"),
        ChatUser("Grace", "grace@example.com"),
        ChatUser("Grace", "grace@example.com"),
        ChatUser("Grace", "grace@example.com"),
        ChatUser("Grace", "grace@example.com"),
        ChatUser("Grace", "grace@example.com"),
        ChatUser("Grace", "grace@example.com"),
        ChatUser("Grace", "grace@example.com"),
        ChatUser("Grace", "grace@example.com"),
        ChatUser("Grace", "grace@example.com"),
        ChatUser("Grace", "grace@example.com"),
        ChatUser("Grace", "grace@example.com"),
        ChatUser("Grace", "grace@example.com"),
    )

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Chats") }
            )
        }
    ) { innerPadding ->
        LazyColumn(
            modifier = Modifier
                .padding(innerPadding)
                .fillMaxSize(),
            contentPadding = PaddingValues(8.dp),
            verticalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            items(chatList) { user ->
                ChatListItem(
                    name = user.name,
                    email = user.email,
                    onClick = {
                        navController.navigate("details")
                    }
                )
            }
        }
    }
}

@Composable
fun ChatListItem(name: String, email: String, onClick: () -> Unit) {
    Surface(
        tonalElevation = 2.dp,
        shape = MaterialTheme.shapes.medium,
        modifier = Modifier
            .fillMaxWidth()
            .clickable { onClick() }
    ) {
        Row(
            modifier = Modifier
                .padding(12.dp),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            // Avatar
            Box(
                modifier = Modifier
                    .size(48.dp)
                    .clip(CircleShape)
                    .background(Color(0xFF90CAF9)), // Light blue
                contentAlignment = Alignment.Center
            ) {
                Text(
                    text = name.first().uppercase(),
                    fontWeight = FontWeight.Bold,
                    fontSize = 20.sp,
                    color = Color.White
                )
            }

            // Name and Email
            Column(
                modifier = Modifier
                    .weight(1f)
                    .padding(start = 12.dp)
            ) {
                Text(text = name, fontWeight = FontWeight.SemiBold, fontSize = 16.sp)
                Text(text = email, fontSize = 14.sp, color = Color.Gray)
            }

            Icon(
                painter = painterResource(id = R.drawable.message),
                contentDescription = "Message",
                tint = Color.Gray,
                modifier = Modifier.size(24.dp)
            )
        }
    }
}
