package com.nadarm.yogiyo.ui.model

data class PlusRestaurant(
    override val id: Long,
    override val name: String,
    override val thumbnailUrl: String
) : Restaurant(id, name, thumbnailUrl)