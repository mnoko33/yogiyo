package com.nadarm.yogiyo.data.remote.api

import com.nadarm.yogiyo.data.model.GetFoodCategoriesResponse
import io.reactivex.Single
import retrofit2.http.GET
import retrofit2.http.Header

interface FoodCategoryService {

    @GET("api/restaurants/categories")
    fun getFoodCategories(
        @Header("x-access-token") token: String
    ): Single<GetFoodCategoriesResponse>


}