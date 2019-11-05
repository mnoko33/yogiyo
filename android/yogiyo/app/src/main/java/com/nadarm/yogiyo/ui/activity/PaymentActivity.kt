package com.nadarm.yogiyo.ui.activity

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.nadarm.yogiyo.R
import kotlinx.android.synthetic.main.activity_ad.*

class PaymentActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_payment)


        val url =
            intent.getStringExtra("paymentUrl")

        web_view.loadUrl(url)


    }
}
