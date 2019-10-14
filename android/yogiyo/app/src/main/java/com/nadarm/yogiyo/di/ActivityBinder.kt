package com.nadarm.yogiyo.di

import com.nadarm.yogiyo.ui.activity.MainActivity
import com.nadarm.yogiyo.ui.activity.SplashActivity
import dagger.Module
import dagger.android.ContributesAndroidInjector

@Module
abstract class ActivityBinder {

    @ContributesAndroidInjector
    abstract fun bindSplashActivity(): SplashActivity

    @ContributesAndroidInjector
    abstract fun bindMainActivity(): MainActivity


}