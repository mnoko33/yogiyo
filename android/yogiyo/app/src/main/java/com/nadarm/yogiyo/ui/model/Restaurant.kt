package com.nadarm.yogiyo.ui.model

open class Restaurant(
    open val id: Long,
    open val name: String,
    open val thumbnailUrl: String,
    open val address: String,
    open val openTime: String,
    open val deliveryTime: Int,
    open val representativeMenus: String,
    open val deliveryFee: Int,
    open val minOrderAmount: Int,
    open val paymentMethods: String,
    open val isPlus:Boolean
) : BaseItem.SingleItem()