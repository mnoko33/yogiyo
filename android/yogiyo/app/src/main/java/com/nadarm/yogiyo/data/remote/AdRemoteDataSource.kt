package com.nadarm.yogiyo.data.remote

import com.nadarm.yogiyo.util.mapAdsFromData
import com.nadarm.yogiyo.data.remote.api.AdRetrofit
import com.nadarm.yogiyo.data.repository.AdDataSource
import com.nadarm.yogiyo.ui.model.Ad
import io.reactivex.Single
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class AdRemoteDataSource @Inject constructor(
    private val adRetrofit: AdRetrofit
) : AdDataSource.Remote {

    override fun getAds(type: Ad.Type, token: String, baseUrl: String): Single<List<Ad>> {
        return adRetrofit.getAds(token)
            .map { it.mapAdsFromData(baseUrl) }
    }

}