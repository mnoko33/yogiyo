package com.nadarm.yogiyo.data.remote

import com.nadarm.yogiyo.util.mapCategoriesFromData
import com.nadarm.yogiyo.data.remote.api.FoodCategoryRetrofit
import com.nadarm.yogiyo.data.repository.FoodCategoryDataSource
import com.nadarm.yogiyo.ui.model.FoodCategory
import io.reactivex.Single
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class FoodCategoryRemoteDataSource @Inject constructor(
    private val foodCategoryRetrofit: FoodCategoryRetrofit
) : FoodCategoryDataSource.Remote {

    override fun getCategories(token: String, baseUrl: String): Single<List<FoodCategory>> {
        return foodCategoryRetrofit.getCategories(token)
            .map { it.mapCategoriesFromData(baseUrl) }
    }

}