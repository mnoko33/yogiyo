package com.nadarm.yogiyo.data.repository

import com.nadarm.yogiyo.ui.model.Ad
import io.reactivex.Single
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class AdDataRepository @Inject constructor(
    private val cache: AdDataSource.Cache,
    private val remote: AdDataSource.Remote
) : AdRepository {


    override fun getAds(
        type: Ad.Type,
        token: String,
        baseUrl: String
    ): Single<List<Ad>> {
//        return cache.getAds(type, token, baseUrl)  TODO ads cache
        return remote.getAds(type, token, baseUrl)
    }
}