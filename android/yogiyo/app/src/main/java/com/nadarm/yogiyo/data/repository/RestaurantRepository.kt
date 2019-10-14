package com.nadarm.yogiyo.data.repository

import com.nadarm.yogiyo.ui.model.Restaurant
import io.reactivex.Single

interface RestaurantRepository {

    fun getRestaurants(): Single<List<Restaurant>>
}

interface RestaurantDataSource : RestaurantRepository {
    interface Cache : RestaurantDataSource

}