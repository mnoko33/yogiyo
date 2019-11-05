package com.nadarm.yogiyo.data.model

class RequestPaymentBody(
    restaurantId: Long
) {
    val data = RequestPaymentData(restaurantId)
}

data class RequestPaymentData(
    val restaurantId: Long
)