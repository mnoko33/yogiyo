package com.nadarm.yogiyo.data.repository

import com.nadarm.yogiyo.ui.model.Restaurant
import com.nadarm.yogiyo.ui.model.RestaurantDetail
import io.reactivex.Single
import javax.inject.Inject
import javax.inject.Singleton


@Singleton
class RestaurantDataRepository @Inject constructor(
    private val cache: RestaurantDataSource.Cache,
    private val remote: RestaurantDataSource.Remote
) : RestaurantRepository {

    override fun getRestaurants(
        isPlus: Boolean,
        categoryId: Long,
        token: String
    ): Single<List<Restaurant>> {
//        return cache.getRestaurants(isPlus, category, baseUrl, token) TODO cache
        return remote.getRestaurants(isPlus, categoryId, token)
    }

    override fun getRestaurantDetail(
        restaurantId: Long,
        token: String
    ): Single<RestaurantDetail> {
//        return cache.getRestaurantDetail(restaurantId, baseUrl, token)  TODO cache
        return remote.getRestaurantDetail(restaurantId, token)
    }

    override fun requestPayment(restaurantId: Long, token: String): Single<String> {
        return remote.requestPayment(restaurantId, token)
    }
}