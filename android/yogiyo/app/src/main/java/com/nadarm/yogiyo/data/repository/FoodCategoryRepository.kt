package com.nadarm.yogiyo.data.repository

import com.nadarm.yogiyo.ui.model.FoodCategory
import io.reactivex.Single

interface FoodCategoryRepository {

    fun getCategories(token: String, baseUrl: String): Single<List<FoodCategory>>

}

interface FoodCategoryDataSource : FoodCategoryRepository {
    interface Cache : FoodCategoryDataSource
    interface Remote: FoodCategoryDataSource
}