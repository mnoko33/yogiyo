package com.nadarm.yogiyo.ui.viewModel

import com.nadarm.yogiyo.data.repository.RestaurantRepository
import com.nadarm.yogiyo.ui.adapter.BaseListAdapter
import com.nadarm.yogiyo.ui.model.BaseItem
import com.nadarm.yogiyo.ui.model.Restaurant
import io.reactivex.Flowable
import io.reactivex.processors.BehaviorProcessor
import io.reactivex.processors.PublishProcessor
import io.reactivex.rxkotlin.zipWith
import io.reactivex.schedulers.Schedulers
import java.util.concurrent.TimeUnit
import javax.inject.Inject

interface RestaurantViewModel {

    interface Inputs : BaseListAdapter.Delegate {
        fun isPlus(value: Boolean)
        fun category(id: Long)
    }

    interface Outputs {
        fun restaurantList(): Flowable<List<BaseItem>>
        fun scrollPosition(): Flowable<Int>
        fun startRestaurantActivity(): Flowable<Restaurant>
    }

    class ViewModelImpl @Inject constructor(
        private val restaurantRepo: RestaurantRepository
    ) : BaseViewModel(), Inputs, Outputs {

        private val itemClicked: PublishProcessor<BaseItem> = PublishProcessor.create()
        private val lastScrollPosition: PublishProcessor<Int> = PublishProcessor.create()
        private val isPlus: PublishProcessor<Boolean> = PublishProcessor.create()
        private val category: PublishProcessor<Long> = PublishProcessor.create()

        private val restaurantList: BehaviorProcessor<List<BaseItem>> = BehaviorProcessor.create()
        private val scrollPosition: BehaviorProcessor<Int> = BehaviorProcessor.createDefault(0)
        private val startRestaurantActivity: Flowable<Restaurant>


        val inputs: Inputs = this
        val outputs: Outputs = this

        init {

            isPlus.zipWith(category) { isPlus, categoryId -> isPlus to categoryId }
                .flatMapSingle {
                    val isPlus = it.first
                    val categoryId = it.second
                    restaurantRepo.getRestaurants(isPlus, categoryId)
                        .subscribeOn(Schedulers.io())
                }
                .subscribe(restaurantList)

            lastScrollPosition
                .subscribe(scrollPosition)

            startRestaurantActivity = itemClicked
                .throttleFirst(1000, TimeUnit.MILLISECONDS)
                .map { it as Restaurant }


        }

        override fun restaurantList(): Flowable<List<BaseItem>> = restaurantList
        override fun scrollPosition(): Flowable<Int> = scrollPosition
        override fun startRestaurantActivity(): Flowable<Restaurant> = startRestaurantActivity

        override fun itemClicked(item: BaseItem) {
            itemClicked.onNext(item)
        }

        override fun lastScrollPosition(position: Int) {
            lastScrollPosition.onNext(position)
        }

        override fun isPlus(value: Boolean) {
            isPlus.onNext(value)
        }

        override fun category(id: Long) {
            category.onNext(id)
        }

    }

}