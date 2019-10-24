package com.nadarm.yogiyo.ui.model

data class FoodCategory(
    val id: Long,
    val name: String,
    val imgUrl: String
) : BaseItem.SingleItem()