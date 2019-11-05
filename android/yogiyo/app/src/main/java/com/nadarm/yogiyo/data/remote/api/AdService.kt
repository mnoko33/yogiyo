package com.nadarm.yogiyo.data.remote.api

import com.nadarm.yogiyo.data.model.GetAdsResponse
import io.reactivex.Single
import retrofit2.http.GET
import retrofit2.http.Header

interface AdService {

    @GET("api/info/ad")
    fun getAds(
        @Header("x-access-token") token: String
    ): Single<GetAdsResponse>


}