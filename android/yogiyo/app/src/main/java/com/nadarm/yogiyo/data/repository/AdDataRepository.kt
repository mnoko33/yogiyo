package com.nadarm.yogiyo.data.repository

import com.nadarm.yogiyo.ui.model.Ad
import io.reactivex.Single
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class AdDataRepository @Inject constructor(
    private val cache: AdDataSource.Cache
) : AdRepository {


    override fun getAds(type: Ad.Type): Single<List<Ad>> {
        return cache.getAds(type)
    }
}