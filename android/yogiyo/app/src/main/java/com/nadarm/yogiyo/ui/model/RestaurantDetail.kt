package com.nadarm.yogiyo.ui.model

data class RestaurantDetail(
    val restaurant: Restaurant,
    val numOfMenu:Int,
    val labels:List<LabeledDishes>
)