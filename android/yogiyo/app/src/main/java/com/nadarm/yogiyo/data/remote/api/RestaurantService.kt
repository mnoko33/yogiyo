package com.nadarm.yogiyo.data.remote.api

import com.nadarm.yogiyo.data.model.GetRestaurantDetailResponse
import com.nadarm.yogiyo.data.model.GetRestaurantResponse
import com.nadarm.yogiyo.data.model.RequestPaymentBody
import com.nadarm.yogiyo.data.model.RequestPaymentResponse
import io.reactivex.Single
import retrofit2.http.*

interface RestaurantService {

    @GET("api/restaurants/categories/{categoryId}")
    fun getRestaurants(
        @Path("categoryId") categoryId: Long,
        @Header("x-access-token") token: String
    ): Single<GetRestaurantResponse>

    @GET("api/restaurants/plus-categories/{categoryId}")
    fun getPlusRestaurants(
        @Path("categoryId") categoryId: Long,
        @Header("x-access-token") token: String
    ): Single<GetRestaurantResponse>

    @GET("api/restaurants/{restaurantId}/menus")
    fun getRestaurantDetail(
        @Path("restaurantId") restaurantId: Long,
        @Header("x-access-token") token: String
    ): Single<GetRestaurantDetailResponse>

    @POST("api/restaurants/payment-request")
    fun requestPayment(
        @Body body: RequestPaymentBody,
        @Header("x-access-token") token: String
    ): Single<RequestPaymentResponse>
}