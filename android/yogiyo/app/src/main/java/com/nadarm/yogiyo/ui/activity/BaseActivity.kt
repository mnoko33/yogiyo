package com.nadarm.yogiyo.ui.activity

import dagger.android.support.DaggerAppCompatActivity
import io.reactivex.disposables.CompositeDisposable

abstract class BaseActivity : DaggerAppCompatActivity() {

    protected val compositeDisposable = CompositeDisposable()

    override fun onDestroy() {
        compositeDisposable.clear()
        super.onDestroy()
    }
}