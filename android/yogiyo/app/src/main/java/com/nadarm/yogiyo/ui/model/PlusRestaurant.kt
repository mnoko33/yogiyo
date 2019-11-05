package com.nadarm.yogiyo.ui.model

data class PlusRestaurant(
    override val id: Long,
    override val name: String,
    override val thumbnailUrl: String,
    override val address: String,
    override val openTime: String,
    override val deliveryTime: Int,
    override val representativeMenus: String,
    override val deliveryFee: Int,
    override val minOrderAmount: Int,
    override val paymentMethods: String,
    override val isPlus: Boolean
) : Restaurant(
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