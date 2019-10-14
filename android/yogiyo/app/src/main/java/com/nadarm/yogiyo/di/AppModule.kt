package com.nadarm.yogiyo.di

import android.app.Application
import dagger.Module
import dagger.Provides
import javax.inject.Singleton

@Module
class AppModule {

    @Provides
    @Singleton
    fun provideApp(application: Application): Application {
        return application
    }

}