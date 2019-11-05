package com.nadarm.yogiyo.data.remote.api

import com.nadarm.yogiyo.data.model.Category
import io.reactivex.Single
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class FoodCategoryRetrofit @Inject constructor(
    private val service: FoodCategoryService
) {

    fun getCategories(token: String): Single<List<Category>> {
        return service.getFoodCategories(token)
            .map { it.categories }
    }
}