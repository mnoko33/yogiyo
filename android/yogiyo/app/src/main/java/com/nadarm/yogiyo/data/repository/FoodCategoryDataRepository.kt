package com.nadarm.yogiyo.data.repository

import com.nadarm.yogiyo.ui.model.FoodCategory
import io.reactivex.Single
import javax.inject.Inject
import javax.inject.Singleton


@Singleton
class FoodCategoryDataRepository @Inject constructor(
    private val cache: FoodCategoryDataSource.Cache,
    private val remote: FoodCategoryDataSource.Remote
) : FoodCategoryRepository {

    override fun getCategories(token: String, baseUrl: String): Single<List<FoodCategory>> {
        // TODO FoodCategoryDataRepository - cache
        return remote.getCategories(token, baseUrl)
    }
}