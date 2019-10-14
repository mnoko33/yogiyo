package com.nadarm.yogiyo.ui.activity

import android.content.Intent
import android.os.Bundle
import com.nadarm.yogiyo.R
import io.reactivex.Observable
import io.reactivex.rxkotlin.addTo
import java.util.concurrent.TimeUnit

class SplashActivity : BaseActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_splash)

        Observable.timer(700, TimeUnit.MILLISECONDS)
            .subscribe {
                val intent = Intent(this, MainActivity::class.java)
                startActivity(intent)
                finish()
            }
            .addTo(compositeDisposable)
    }
}
