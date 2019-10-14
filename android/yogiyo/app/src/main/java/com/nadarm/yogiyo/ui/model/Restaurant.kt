package com.nadarm.yogiyo.ui.model

open class Restaurant(
    open val id: Long,
    open val name: String,
    open val thumbnailUrl: String
) : BaseItem.SingleItem()