package com.nadarm.yogiyo.ui.model

data class PlusRestaurant(
    override val id: Long,
    override val name: String,
    override val categories: Array<String>,
    override val thumbnailUrl: String,
    override val address: String,
    override val lng: Double,
    override val lat: Double,
    override val openTime: String,
    override val deliveryTime: Int,
    override val representativeMenus: String,
    override val deliveryFee: Int,
    override val minOrderAmount: Int,
    override val paymentMethods: String,
    override val createdAt: String,
    override val updatedAt: String,
    override val isPlus: Boolean
) : Restaurant(
    id,
    name,
    categories,
    thumbnailUrl,
    address,
    lng,
    lat,
    openTime,
    deliveryTime,
    representativeMenus,
    deliveryFee,
    minOrderAmount,
    paymentMethods,
    createdAt,
    updatedAt,
    isPlus
)