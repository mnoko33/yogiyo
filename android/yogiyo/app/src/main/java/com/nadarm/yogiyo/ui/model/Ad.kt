package com.nadarm.yogiyo.ui.model

data class Ad(
    val id: Long,
    val type: Type,
    val imageUrl: String
) : BaseItem.SingleItem() {

    enum class Type {
        Large,
        Small
    }

}