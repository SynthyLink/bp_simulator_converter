package com.synthylink.javaasynctcpclient

import android.os.Bundle
import android.widget.Button
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import communication.AsyncTcpClient
import communication.ConsoleByteReceiver
import communication.FetchDataTask

class MainActivity : AppCompatActivity() {

    var fech : FetchDataTask = FetchDataTask("31.10.82.229", 7168, ConsoleByteReceiver())
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_main)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }
        try {

            btn = findViewById(R.id.button)
             btn.setOnClickListener { start() }
        } catch (e: Exception) {
        }
    }

    fun start() {
        fech = FetchDataTask("31.10.82.229", 7168, ConsoleByteReceiver())
        val string = "Hello world"
        val b = string.toByteArray()
        fech.execute(b)
    }

    lateinit var btn : Button
    lateinit var client : AsyncTcpClient;//("31.10.82.229",7168)
}

