package com.nadarm.yogiyo.data.remote.api

import com.nadarm.yogiyo.data.model.Ad
import io.reactivex.Single
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class AdRetrofit @Inject constructor(
    private val service: AdService
) {

    fun getAds(token: String): Single<List<Ad>> {
        return service.getAds(token)
            .map { it.ads }
    }
}