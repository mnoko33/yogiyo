package com.nadarm.yogiyo.ui.model

open class Restaurant(
    open val id: Long,
    open val name: String,
    open val categories: Array<String>,
    open val thumbnailUrl: String,
    open val address: String,
    open val lng: Double,
    open val lat: Double,
    open val openTime: String,
    open val deliveryTime: Int,
    open val representativeMenus: String,
    open val deliveryFee: Int,
    open val minOrderAmount: Int,
    open val paymentMethods: String,
    open val createdAt: String,
    open val updatedAt: String,
    open val isPlus:Boolean
) : BaseItem.SingleItem()