package com.nadarm.yogiyo.data.cache

import com.nadarm.yogiyo.data.repository.RestaurantDataSource
import com.nadarm.yogiyo.ui.model.PlusRestaurant
import com.nadarm.yogiyo.ui.model.Restaurant
import io.reactivex.Single
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class RestaurantCacheDataSource @Inject constructor() : RestaurantDataSource.Cache {

    private val restaurants: MutableList<Restaurant> = ArrayList()
    private val plusRestaurants: MutableList<PlusRestaurant> = ArrayList()

    init {
        //TODO restaurant 캐시 데이터
        val items = listOf(
            Restaurant(
                1,
                "카페마마스 잠실점",
                arrayOf("야식", "프렌차이즈", "한식"),
                "https://i.imgur.com/dlFdn4F.png",
                "역삼동",
                127.029799209808,
                37.4970170754811,
                "11:00 - 01:00",
                60,
                "구이삼겹 1인, 구이삼겹 2인",
                2000,
                12000,
                "creditcard::online",
                "2019-10-15T13:48:47.000Z",
                "2019-10-15T13:48:47.000Z",
                true
            ),
            Restaurant(
                2,
                "카페마마스 잠실점",
                arrayOf("야식", "프렌차이즈", "한식"),
                "https://i.imgur.com/dlFdn4F.png",
                "역삼동",
                127.029799209808,
                37.4970170754811,
                "11:00 - 01:00",
                60,
                "구이삼겹 1인, 구이삼겹 2인",
                2000,
                12000,
                "creditcard::online",
                "2019-10-15T13:48:47.000Z",
                "2019-10-15T13:48:47.000Z",
                true
            ), Restaurant(
                3,
                "카페마마스 잠실점",
                arrayOf("야식", "프렌차이즈", "한식"),
                "https://i.imgur.com/dlFdn4F.png",
                "역삼동",
                127.029799209808,
                37.4970170754811,
                "11:00 - 01:00",
                60,
                "구이삼겹 1인, 구이삼겹 2인",
                2000,
                12000,
                "creditcard::online",
                "2019-10-15T13:48:47.000Z",
                "2019-10-15T13:48:47.000Z",
                true
            ),
            Restaurant(
                1,
                "카페마마스 잠실점",
                arrayOf("야식", "프렌차이즈", "한식"),
                "https://i.imgur.com/dlFdn4F.png",
                "역삼동",
                127.029799209808,
                37.4970170754811,
                "11:00 - 01:00",
                60,
                "구이삼겹 1인, 구이삼겹 2인",
                2000,
                12000,
                "creditcard::online",
                "2019-10-15T13:48:47.000Z",
                "2019-10-15T13:48:47.000Z",
                false
            ),
            Restaurant(
                2,
                "카페마마스 잠실점",
                arrayOf("야식", "프렌차이즈", "한식"),
                "https://i.imgur.com/dlFdn4F.png",
                "역삼동",
                127.029799209808,
                37.4970170754811,
                "11:00 - 01:00",
                60,
                "구이삼겹 1인, 구이삼겹 2인",
                2000,
                12000,
                "creditcard::online",
                "2019-10-15T13:48:47.000Z",
                "2019-10-15T13:48:47.000Z",
                false
            ), Restaurant(
                3,
                "카페마마스 잠실점",
                arrayOf("야식", "프렌차이즈", "한식"),
                "https://i.imgur.com/dlFdn4F.png",
                "역삼동",
                127.029799209808,
                37.4970170754811,
                "11:00 - 01:00",
                60,
                "구이삼겹 1인, 구이삼겹 2인",
                2000,
                12000,
                "creditcard::online",
                "2019-10-15T13:48:47.000Z",
                "2019-10-15T13:48:47.000Z",
                false
            )
        )

        val items2 = listOf(
            PlusRestaurant(
                1,
                "카페마마스 잠실점",
                arrayOf("야식", "프렌차이즈", "한식"),
                "https://i.imgur.com/dlFdn4F.png",
                "역삼동",
                127.029799209808,
                37.4970170754811,
                "11:00 - 01:00",
                60,
                "구이삼겹 1인, 구이삼겹 2인",
                2000,
                12000,
                "creditcard::online",
                "2019-10-15T13:48:47.000Z",
                "2019-10-15T13:48:47.000Z",
                true
            ),
            PlusRestaurant(
                2,
                "카페마마스 잠실점",
                arrayOf("야식", "프렌차이즈", "한식"),
                "https://i.imgur.com/dlFdn4F.png",
                "역삼동",
                127.029799209808,
                37.4970170754811,
                "11:00 - 01:00",
                60,
                "구이삼겹 1인, 구이삼겹 2인",
                2000,
                12000,
                "creditcard::online",
                "2019-10-15T13:48:47.000Z",
                "2019-10-15T13:48:47.000Z",
                true
            ), PlusRestaurant(
                3,
                "카페마마스 잠실점",
                arrayOf("야식", "프렌차이즈", "한식"),
                "https://i.imgur.com/dlFdn4F.png",
                "역삼동",
                127.029799209808,
                37.4970170754811,
                "11:00 - 01:00",
                60,
                "구이삼겹 1인, 구이삼겹 2인",
                2000,
                12000,
                "creditcard::online",
                "2019-10-15T13:48:47.000Z",
                "2019-10-15T13:48:47.000Z",
                true
            ),
            PlusRestaurant(
                1,
                "카페마마스 잠실점",
                arrayOf("야식", "프렌차이즈", "한식"),
                "https://i.imgur.com/dlFdn4F.png",
                "역삼동",
                127.029799209808,
                37.4970170754811,
                "11:00 - 01:00",
                60,
                "구이삼겹 1인, 구이삼겹 2인",
                2000,
                12000,
                "creditcard::online",
                "2019-10-15T13:48:47.000Z",
                "2019-10-15T13:48:47.000Z",
                false
            ),
            PlusRestaurant(
                2,
                "카페마마스 잠실점",
                arrayOf("야식", "프렌차이즈", "한식"),
                "https://i.imgur.com/dlFdn4F.png",
                "역삼동",
                127.029799209808,
                37.4970170754811,
                "11:00 - 01:00",
                60,
                "구이삼겹 1인, 구이삼겹 2인",
                2000,
                12000,
                "creditcard::online",
                "2019-10-15T13:48:47.000Z",
                "2019-10-15T13:48:47.000Z",
                false
            ), PlusRestaurant(
                3,
                "카페마마스 잠실점",
                arrayOf("야식", "프렌차이즈", "한식"),
                "https://i.imgur.com/dlFdn4F.png",
                "역삼동",
                127.029799209808,
                37.4970170754811,
                "11:00 - 01:00",
                60,
                "구이삼겹 1인, 구이삼겹 2인",
                2000,
                12000,
                "creditcard::online",
                "2019-10-15T13:48:47.000Z",
                "2019-10-15T13:48:47.000Z",
                false
            )
        )

        restaurants.addAll(items + items + items + items + items + items + items)
        plusRestaurants.addAll(items2 + items2 + items2 + items2 + items2 + items2 + items2)
    }

    override fun getRestaurants(isPlus: Boolean, category: Long): Single<List<Restaurant>> {
//        val restaurants = this.restaurants
//            .filter { it.isPlus == isPlus }
//            .filter { it.categories.contains(category) }
//        return Single.just(restaurants)
        val result = if (isPlus) {
            plusRestaurants
        } else {
            restaurants
        }
        return Single.just(result)
    }
}