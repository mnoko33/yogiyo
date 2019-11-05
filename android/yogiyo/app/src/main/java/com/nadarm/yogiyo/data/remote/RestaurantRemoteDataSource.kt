package com.nadarm.yogiyo.data.remote

import com.nadarm.yogiyo.data.remote.api.RestaurantRetrofit
import com.nadarm.yogiyo.data.repository.RestaurantDataSource
import com.nadarm.yogiyo.ui.model.Restaurant
import com.nadarm.yogiyo.ui.model.RestaurantDetail
import com.nadarm.yogiyo.util.mapFromData
import com.nadarm.yogiyo.util.mapFromDataRestaurant
import com.nadarm.yogiyo.util.mapRestaurantsFromData
import io.reactivex.Single
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class RestaurantRemoteDataSource @Inject constructor(
    private val retrofit: RestaurantRetrofit
) : RestaurantDataSource.Remote {

    override fun getRestaurants(
        isPlus: Boolean,
        categoryId: Long,
        token: String
    ): Single<List<Restaurant>> {
        return if (isPlus) {
            retrofit.getPlusRestaurants(categoryId, token)
                .map { it.mapRestaurantsFromData() }
        } else {
            retrofit.getRestaurants(categoryId, token)
                .map { it.mapFromDataRestaurant() }
        }
            .map { list ->
                list.filter {
                    it.thumbnailUrl != ""
                }
            }
//        }.map { it.mapRestaurantsFromData() }
    }

    override fun getRestaurantDetail(
        restaurantId: Long,
        token: String
    ): Single<RestaurantDetail> {
        return retrofit.getRestaurantDetail(restaurantId, token)
            .map { it.mapFromData() }
    }

    override fun requestPayment(restaurantId: Long, token: String): Single<String> {
        return retrofit.requestPayment(restaurantId, token)
    }
}