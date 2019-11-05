package com.nadarm.yogiyo.di

import com.nadarm.yogiyo.ui.activity.AdActivity
import com.nadarm.yogiyo.ui.activity.MainActivity
import com.nadarm.yogiyo.ui.activity.RestaurantActivity
import com.nadarm.yogiyo.ui.activity.SplashActivity
import dagger.Module
import dagger.android.ContributesAndroidInjector

@Module
abstract class ActivityBinderModule {

    @ContributesAndroidInjector
    @ActivityScope
    abstract fun bindSplashActivity(): SplashActivity

    @ContributesAndroidInjector(modules = [NavHostModule::class, MainActivityModule::class])
    @ActivityScope
    abstract fun bindMainActivity(): MainActivity

    @ContributesAndroidInjector(modules = [RestaurantActivityModule::class])
    @ActivityScope
    abstract fun bindRestaurantActivity(): RestaurantActivity

    @ContributesAndroidInjector
    @ActivityScope
    abstract fun bindAdActivity(): AdActivity


}