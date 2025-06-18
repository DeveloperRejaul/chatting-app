package com.example.android_chating_app

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import com.example.android_chating_app.navigation.AppNavigation
import com.example.android_chating_app.ui.theme.Android_chating_appTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            Android_chating_appTheme {
                AppNavigation()
            }
        }
    }
}