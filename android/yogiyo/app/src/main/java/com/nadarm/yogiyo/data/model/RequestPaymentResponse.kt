package com.nadarm.yogiyo.data.model

import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName

data class RequestPaymentResponse(
    @SerializedName("status")
    @Expose
    val status: Boolean,
    @SerializedName("tid")
    @Expose
    val tid: String,
    @SerializedName("next_redirect_app_url")
    @Expose
    val paymentUrl: String
)