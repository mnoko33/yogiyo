package com.nadarm.yogiyo.data.repository

import com.nadarm.yogiyo.ui.model.Ad
import io.reactivex.Single

interface AdRepository {

    fun getAds(
        type: Ad.Type,
        token: String,
        baseUrl: String
    ): Single<List<Ad>>
}

interface AdDataSource : AdRepository {
    interface Cache : AdDataSource
    interface Remote : AdDataSource
}