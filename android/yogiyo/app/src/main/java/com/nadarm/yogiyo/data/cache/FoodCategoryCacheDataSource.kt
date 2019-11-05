package com.nadarm.yogiyo.data.cache

import com.nadarm.yogiyo.data.repository.FoodCategoryDataSource
import com.nadarm.yogiyo.ui.model.FoodCategory
import io.reactivex.Single
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class FoodCategoryCacheDataSource @Inject constructor() : FoodCategoryDataSource.Cache {

    private val categories: MutableList<FoodCategory> = ArrayList()

    init {
        //TODO 카테고리 캐시 데이터
        categories.addAll(
            listOf(
                FoodCategory(1, "전체보기", "https://i.imgur.com/Kut64BP.png"),
                FoodCategory(2, "요기요플러스", "https://i.imgur.com/Q76LlXx.png"),
                FoodCategory(3, "1인분", "https://i.imgur.com/TKuUeDn.png"),
                FoodCategory(4, "치킨", "https://i.imgur.com/mA5Rco5.png"),
                FoodCategory(1, "전체보기", "https://i.imgur.com/Kut64BP.png"),
                FoodCategory(2, "요기요플러스", "https://i.imgur.com/Q76LlXx.png"),
                FoodCategory(3, "1인분", "https://i.imgur.com/TKuUeDn.png"),
                FoodCategory(1, "전체보기", "https://i.imgur.com/Kut64BP.png"),
                FoodCategory(2, "요기요플러스", "https://i.imgur.com/Q76LlXx.png"),
                FoodCategory(3, "1인분", "https://i.imgur.com/TKuUeDn.png"),
                FoodCategory(4, "치킨", "https://i.imgur.com/mA5Rco5.png")
            )
        )
    }

    override fun getCategories(token: String, baseUrl: String): Single<List<FoodCategory>> {
        return Single.just(categories)
    }
}