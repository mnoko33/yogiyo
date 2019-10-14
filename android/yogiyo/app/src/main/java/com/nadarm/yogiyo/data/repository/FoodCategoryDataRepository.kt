package com.nadarm.yogiyo.data.repository

import com.nadarm.yogiyo.ui.model.FoodCategory
import io.reactivex.Single
import javax.inject.Inject
import javax.inject.Singleton


@Singleton
class FoodCategoryDataRepository @Inject constructor(
    private val cache: FoodCategoryDataSource.Cache
) : FoodCategoryRepository {

    override fun getCategories(): Single<List<FoodCategory>> {
        return cache.getCategories()
    }
}