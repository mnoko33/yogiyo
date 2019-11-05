package com.nadarm.yogiyo.ui.model

data class Dish(
    val id: Long,
    val name: String,
    val restaurantId: Long,
    val label: String,
    val description: String,
    val price: Int,
    val imageUrl:String? = null
) : BaseItem.SingleItem()
