package com.nadarm.yogiyo.ui.model

data class LabeledDishes(
    val label: String,
    val dishes: List<Dish>
) : BaseItem.SingleItem()