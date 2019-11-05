package com.nadarm.yogiyo.util

import com.nadarm.yogiyo.data.model.*
import com.nadarm.yogiyo.ui.model.FoodCategory
import com.nadarm.yogiyo.ui.model.PlusRestaurant
import com.nadarm.yogiyo.ui.model.RestaurantDetail


fun FoodCategory.mapToData(): Category {
    return Category(this.id, this.name, this.imgUrl)
}

fun List<FoodCategory>.mapToData(): List<Category> {
    return this.map { it.mapToData() }
}

fun Category.mapFromData(baseUrl: String): FoodCategory {
    return FoodCategory(this.id, this.name, baseUrl + this.imgUrl)
}

fun List<Category>.mapCategoriesFromData(baseUrl: String): List<FoodCategory> {
    return this.map { it.mapFromData(baseUrl) }
}

fun Ad.mapFromData(baseUrl: String): com.nadarm.yogiyo.ui.model.Ad {
    val type = when (this.type) {
        "mainAd" -> com.nadarm.yogiyo.ui.model.Ad.Type.Large
        else -> com.nadarm.yogiyo.ui.model.Ad.Type.Small
    }
    return com.nadarm.yogiyo.ui.model.Ad(
        this.id,
        type,
        baseUrl + this.imgUrl
    )
}

fun List<Ad>.mapAdsFromData(baseUrl: String): List<com.nadarm.yogiyo.ui.model.Ad> {
    return this.map { it.mapFromData(baseUrl) }
}


fun Restaurant.mapFromData(): com.nadarm.yogiyo.ui.model.Restaurant {
    return when (isPlus) {
        false -> com.nadarm.yogiyo.ui.model.Restaurant(
            id,
            name,
            thumbnailUrl,
            address,
            openTime,
            deliveryTime,
            representativeMenus,
            deliveryFee,
            minOrderAmount,
            paymentMethods,
            isPlus
        )
        true -> PlusRestaurant(
            id,
            name,
            thumbnailUrl,
            address,
            openTime,
            deliveryTime,
            representativeMenus,
            deliveryFee,
            minOrderAmount,
            paymentMethods,
            isPlus
        )
    }
}

fun List<Restaurant>.mapFromDataRestaurant(): List<com.nadarm.yogiyo.ui.model.Restaurant> {
    return this.map {
        com.nadarm.yogiyo.ui.model.Restaurant(
            it.id,
            it.name,
            it.thumbnailUrl,
            it.address,
            it.openTime,
            it.deliveryTime,
            it.representativeMenus,
            it.deliveryFee,
            it.minOrderAmount,
            it.paymentMethods,
            it.isPlus
        )
    }
}


fun List<Restaurant>.mapRestaurantsFromData(): List<com.nadarm.yogiyo.ui.model.Restaurant> {
    return this.map { it.mapFromData() }
}

fun GetRestaurantDetailResponse.mapFromData(): RestaurantDetail {
    return RestaurantDetail(
        restaurant.mapFromData(),
        numOfMenu,
        menus.map { it.mapFromData() }
    )
}

fun LabeledDishes.mapFromData(): com.nadarm.yogiyo.ui.model.LabeledDishes {
    return com.nadarm.yogiyo.ui.model.LabeledDishes(
        label,
        dishes.map { it.mapFromData() }
    )
}

fun Dish.mapFromData(): com.nadarm.yogiyo.ui.model.Dish {
    return com.nadarm.yogiyo.ui.model.Dish(
        id, name, restaurantId, label, description, price
    )
}
