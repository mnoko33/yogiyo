package com.nadarm.yogiyo.data.cache

import com.nadarm.yogiyo.data.repository.RestaurantDataSource
import com.nadarm.yogiyo.ui.model.Restaurant
import io.reactivex.Single
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class RestaurantCacheDataSource @Inject constructor() : RestaurantDataSource.Cache {

    private val restaurants: MutableList<Restaurant> = ArrayList()

    init {
        //TODO restaurant 캐시 데이터
        restaurants.addAll(
            listOf(
                Restaurant(1, "카페마마스 잠실점", "https://i.imgur.com/dlFdn4F.png"),
                Restaurant(2, "카페마마스 잠실점2", "https://i.imgur.com/dlFdn4F.png"),
                Restaurant(3, "카페마마스 잠실점3", "https://i.imgur.com/dlFdn4F.png"),
                Restaurant(4, "카페마마스 잠실점4", "https://i.imgur.com/dlFdn4F.png")
            )
        )
    }

    override fun getRestaurants(): Single<List<Restaurant>> {
        return Single.just(restaurants)
    }

}