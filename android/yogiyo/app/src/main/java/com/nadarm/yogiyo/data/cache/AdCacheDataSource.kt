package com.nadarm.yogiyo.data.cache

import com.nadarm.yogiyo.data.repository.AdDataSource
import com.nadarm.yogiyo.ui.model.Ad
import io.reactivex.Single
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class AdCacheDataSource @Inject constructor() : AdDataSource.Cache {

    private val ads: MutableList<Ad> = ArrayList()

    init {
        //TODO Ad 캐시 데이터
        ads.addAll(
            listOf(
                Ad(1, Ad.Type.Large, "https://i.imgur.com/Gg7P9AC.png", "https://google.com"),
                Ad(2, Ad.Type.Large, "https://i.imgur.com/ArJkOL5.png", "https://google.com"),
                Ad(3, Ad.Type.Large, "https://i.imgur.com/N37AANO.png", "https://google.com"),
                Ad(4, Ad.Type.Large, "https://i.imgur.com/oFc0scN.png", "https://google.com"),
                Ad(1, Ad.Type.Small, "https://i.imgur.com/Gg7P9AC.png", "https://google.com"),
                Ad(2, Ad.Type.Small, "https://i.imgur.com/ArJkOL5.png", "https://google.com"),
                Ad(3, Ad.Type.Small, "https://i.imgur.com/N37AANO.png", "https://google.com"),
                Ad(4, Ad.Type.Small, "https://i.imgur.com/oFc0scN.png", "https://google.com")
            )
        )
    }

    override fun getAds(type: Ad.Type): Single<List<Ad>> {
        return Single.just(ads.filter { it.type == type })
    }
}