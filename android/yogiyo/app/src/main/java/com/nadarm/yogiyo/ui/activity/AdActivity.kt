package com.nadarm.yogiyo.ui.activity

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.nadarm.yogiyo.R
import kotlinx.android.synthetic.main.activity_ad.*

class AdActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_ad)

        val string = intent.getLongExtra("adId", -1).toString() + intent.getStringExtra("pageUrl")
        textView2.text = "$string = ok"
    }


}
