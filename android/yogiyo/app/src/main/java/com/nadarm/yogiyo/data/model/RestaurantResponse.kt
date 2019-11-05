package com.nadarm.yogiyo.data.model

import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName


data class GetRestaurantResponse(
    @SerializedName("status")
    @Expose
    val status: Boolean,
    @SerializedName("numsOfRestaurants")
    @Expose
    val numOfRestaurants: Int,
    @SerializedName("restaurants")
    @Expose
    val restaurants: List<Restaurant>
)

data class GetRestaurantDetailResponse(
    @SerializedName("status")
    @Expose
    val status: Boolean,
    @SerializedName("restaurant")
    @Expose
    val restaurant: Restaurant,
    @SerializedName("numsOfMenus")
    @Expose
    val numOfMenu: Int,
    @SerializedName("menus")
    @Expose
    val menus: List<LabeledDishes>
)

data class Restaurant(
    @SerializedName("id")
    @Expose
    val id: Long,
    @SerializedName("name")
    @Expose
    val name: String,
    @SerializedName("thumbnailUrl")
    @Expose
    val thumbnailUrl: String,
    @SerializedName("address")
    @Expose
    val address: String,
    @SerializedName("lng")
    @Expose
    val lng: Double,
    @SerializedName("lat")
    @Expose
    val lat: Double,
    @SerializedName("openTime")
    @Expose
    val openTime: String,
    @SerializedName("deliveryTime")
    @Expose
    val deliveryTime: Int,
    @SerializedName("representativeMenus")
    @Expose
    val representativeMenus: String,
    @SerializedName("deliveryFee")
    @Expose
    val deliveryFee: Int,
    @SerializedName("minOrderAmount")
    @Expose
    val minOrderAmount: Int,
    @SerializedName("isPlus")
    @Expose
    val isPlus: Boolean,
    @SerializedName("paymentMethods")
    @Expose
    val paymentMethods: String
)

data class LabeledDishes(
    @SerializedName("label")
    @Expose
    val label: String,
    @SerializedName("dishes")
    @Expose
    val dishes: List<Dish>
)

data class Dish(
    @SerializedName("id")
    @Expose
    val id: Long,
    @SerializedName("name")
    @Expose
    val name: String,
    @SerializedName("restaurantId")
    @Expose
    val restaurantId: Long,
    @SerializedName("label")
    @Expose
    val label: String,
    @SerializedName("description")
    @Expose
    val description: String,
    @SerializedName("price")
    @Expose
    val price: Int
)