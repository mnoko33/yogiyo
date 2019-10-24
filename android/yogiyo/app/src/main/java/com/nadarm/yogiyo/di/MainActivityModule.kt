package com.nadarm.yogiyo.di

import androidx.lifecycle.ViewModelProvider
import com.nadarm.yogiyo.ui.activity.MainActivity
import dagger.Binds
import dagger.Module
import dagger.Provides

@Module(includes = [MainActivityProviderModule::class])
abstract class MainActivityModule {

//    @FragmentScope
//    @ContributesAndroidInjector(modules = [FoodModule.FoodProviderModule::class])
//    abstract fun bindMainFoodFragment(): FoodHomeFragment

    @Binds
    @ActivityScope
    abstract fun bindViewModelFactory(factory: ViewModelFactory): ViewModelProvider.Factory

}

@Module
class MainActivityProviderModule {

    @Provides
    @ActivityScope
    fun provideViewModelProvider(
        activity: MainActivity,
        factory: ViewModelProvider.Factory
    ): ViewModelProvider {
        return ViewModelProvider(activity, factory)
    }
}