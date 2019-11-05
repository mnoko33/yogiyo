package com.nadarm.yogiyo.di

import androidx.lifecycle.ViewModelProvider
import com.nadarm.yogiyo.ui.activity.RestaurantActivity
import dagger.Binds
import dagger.Module
import dagger.Provides

@Module(includes = [RestaurantActivityProviderModule::class])
interface RestaurantActivityModule {

    @Binds
    @ActivityScope
    fun bindViewModelFactory(factory: ViewModelFactory): ViewModelProvider.Factory

}

@Module
class RestaurantActivityProviderModule {

    @Provides
    @ActivityScope
    fun provideViewModelProvider(
        activity: RestaurantActivity,
        factory: ViewModelProvider.Factory
    ): ViewModelProvider {
        return ViewModelProvider(activity, factory)
    }
}
