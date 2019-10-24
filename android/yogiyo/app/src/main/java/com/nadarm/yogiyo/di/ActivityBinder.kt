package com.nadarm.yogiyo.di

import com.nadarm.yogiyo.ui.activity.MainActivity
import com.nadarm.yogiyo.ui.activity.RestaurantActivity
import com.nadarm.yogiyo.ui.activity.SplashActivity
import dagger.Module
import dagger.android.ContributesAndroidInjector

@Module
abstract class ActivityBinder {

    @ContributesAndroidInjector
    @ActivityScope
    abstract fun bindSplashActivity(): SplashActivity

    @ContributesAndroidInjector(modules = [NavHostModule::class, MainActivityModule::class])
    @ActivityScope
    abstract fun bindMainActivity(): MainActivity

    @ContributesAndroidInjector(modules = [])
    @ActivityScope
    abstract fun bindRestaurantActivity(): RestaurantActivity


}