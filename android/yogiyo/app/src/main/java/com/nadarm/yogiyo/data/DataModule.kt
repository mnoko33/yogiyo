package com.nadarm.yogiyo.data

import com.nadarm.yogiyo.data.cache.AdCacheDataSource
import com.nadarm.yogiyo.data.cache.FoodCategoryCacheDataSource
import com.nadarm.yogiyo.data.cache.RestaurantCacheDataSource
import com.nadarm.yogiyo.data.remote.AdRemoteDataSource
import com.nadarm.yogiyo.data.remote.FoodCategoryRemoteDataSource
import com.nadarm.yogiyo.data.remote.RestaurantRemoteDataSource
import com.nadarm.yogiyo.data.remote.api.AdService
import com.nadarm.yogiyo.data.remote.api.FoodCategoryService
import com.nadarm.yogiyo.data.remote.api.RestaurantService
import com.nadarm.yogiyo.data.repository.*
import dagger.Binds
import dagger.Module
import dagger.Provides
import retrofit2.Retrofit
import retrofit2.adapter.rxjava2.RxJava2CallAdapterFactory
import retrofit2.converter.gson.GsonConverterFactory
import javax.inject.Singleton

@Module(includes = [DataProviderModule::class])
interface DataBindingModule {

    @Binds
    @Singleton
    fun bindFoodCategoryRepository(repository: FoodCategoryDataRepository): FoodCategoryRepository

    @Binds
    @Singleton
    fun bindFoodCategoryCacheDataSource(dataSource: FoodCategoryCacheDataSource): FoodCategoryDataSource.Cache

    @Binds
    @Singleton
    fun bindFoodCategoryRemoteDataSource(dataSource: FoodCategoryRemoteDataSource): FoodCategoryDataSource.Remote

    @Binds
    @Singleton
    fun bindAdRepository(repository: AdDataRepository): AdRepository

    @Binds
    @Singleton
    fun bindAdCacheDataSource(dataSource: AdCacheDataSource): AdDataSource.Cache

    @Binds
    @Singleton
    fun bindAdRemoteDataSource(dataSource: AdRemoteDataSource): AdDataSource.Remote

    @Binds
    @Singleton
    fun bindRestaurantRepository(repository: RestaurantDataRepository): RestaurantRepository

    @Binds
    @Singleton
    fun bindRestaurantCacheDataSource(dataSource: RestaurantCacheDataSource): RestaurantDataSource.Cache

    @Binds
    @Singleton
    fun bindRestaurantRemoteDataSource(dataSource: RestaurantRemoteDataSource): RestaurantDataSource.Remote
}

@Module
object DataProviderModule {

    @JvmStatic
    @Provides
    @Singleton
    fun provideFoodCategoryService(stringMap: Map<String, String>): FoodCategoryService {
        val baseUrl = stringMap["baseUrl"] ?: error("token is not provided")
        val retrofit: Retrofit = Retrofit.Builder()
            .baseUrl(baseUrl)
            .addConverterFactory(GsonConverterFactory.create())
            .addCallAdapterFactory(RxJava2CallAdapterFactory.create())
            .build()
        return retrofit.create(FoodCategoryService::class.java)
    }

    @JvmStatic
    @Provides
    @Singleton
    fun provideAdService(stringMap: Map<String, String>): AdService {
        val baseUrl = stringMap["baseUrl"] ?: error("token is not provided")
        val retrofit: Retrofit = Retrofit.Builder()
            .baseUrl(baseUrl)
            .addConverterFactory(GsonConverterFactory.create())
            .addCallAdapterFactory(RxJava2CallAdapterFactory.create())
            .build()
        return retrofit.create(AdService::class.java)
    }

    @JvmStatic
    @Provides
    @Singleton
    fun provideRestaurantService(stringMap: Map<String, String>): RestaurantService {
        val baseUrl = stringMap["baseUrl"] ?: error("token is not provided")
        val retrofit: Retrofit = Retrofit.Builder()
            .baseUrl(baseUrl)
            .addConverterFactory(GsonConverterFactory.create())
            .addCallAdapterFactory(RxJava2CallAdapterFactory.create())
            .build()
        return retrofit.create(RestaurantService::class.java)
    }

}