package com.nadarm.yogiyo.di

import android.app.Application
import com.nadarm.yogiyo.R
import dagger.Module
import dagger.Provides
import dagger.multibindings.IntoMap
import dagger.multibindings.StringKey
import javax.inject.Singleton

@Module
class AppModule {

    @Provides
    @IntoMap
    @StringKey("token")
    fun provideToken(application: Application): String {
        return application.getString(R.string.token)
    }

    @Provides
    @IntoMap
    @StringKey("baseUrl")
    fun provideBaseUrl(application: Application): String {
        return application.getString(R.string.base_url)
    }

}