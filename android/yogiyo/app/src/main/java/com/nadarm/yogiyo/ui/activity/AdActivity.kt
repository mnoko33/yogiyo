package com.nadarm.yogiyo.ui.activity

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.nadarm.yogiyo.R
import kotlinx.android.synthetic.main.activity_ad.*
import javax.inject.Inject

class AdActivity : BaseActivity() {

    @Inject
    lateinit var stringMap: Map<String, String>

    private val path = "api/info/ad/"

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_ad)

        val url =
            stringMap["baseUrl"] + path + intent.getLongExtra("adId", -1).toString()

        web_view.loadUrl(url)

    }


}
