package com.nadarm.yogiyo.data

import com.nadarm.yogiyo.data.cache.AdCacheDataSource
import com.nadarm.yogiyo.data.cache.FoodCategoryCacheDataSource
import com.nadarm.yogiyo.data.cache.RestaurantCacheDataSource
import com.nadarm.yogiyo.data.repository.*
import dagger.Binds
import dagger.Module
import javax.inject.Singleton

@Module(includes = [DataProvidingModule::class])
interface DataBindingModule {

    @Singleton
    @Binds
    fun bindFoodCategoryRepository(repository: FoodCategoryDataRepository): FoodCategoryRepository

    @Singleton
    @Binds
    fun bindFoodCategoryCacheDataSource(dataSource: FoodCategoryCacheDataSource): FoodCategoryDataSource.Cache

    @Singleton
    @Binds
    fun bindAdRepository(repository: AdDataRepository): AdRepository

    @Singleton
    @Binds
    fun bindAdCacheDataSource(dataSource: AdCacheDataSource): AdDataSource.Cache

    @Singleton
    @Binds
    fun bindRestaurantRepository(repository: RestaurantDataRepository): RestaurantRepository

    @Singleton
    @Binds
    fun bindRestaurantCacheDataSource(dataSource: RestaurantCacheDataSource): RestaurantDataSource.Cache
}

@Module
object DataProvidingModule {


}