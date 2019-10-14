package com.nadarm.yogiyo.ui.viewModel

import com.nadarm.yogiyo.data.repository.RestaurantRepository
import com.nadarm.yogiyo.ui.adapter.BaseListAdapter
import com.nadarm.yogiyo.ui.model.BaseItem
import io.reactivex.Flowable
import io.reactivex.processors.BehaviorProcessor
import io.reactivex.processors.PublishProcessor
import io.reactivex.rxkotlin.addTo
import io.reactivex.rxkotlin.subscribeBy
import javax.inject.Inject

interface RestaurantViewModel {

    interface Inputs : BaseListAdapter.Delegate

    interface Outputs {
        fun restaurantList(): Flowable<List<BaseItem>>
    }

    class ViewModelImpl @Inject constructor(
        private val restaurantRepo: RestaurantRepository
    ) : BaseViewModel(), Inputs, Outputs {

        private val itemClicked: PublishProcessor<BaseItem> = PublishProcessor.create()

        private val restaurantList: BehaviorProcessor<List<BaseItem>> = BehaviorProcessor.create()

        val inputs: Inputs = this
        val outputs: Outputs = this

        init {

            restaurantRepo.getRestaurants()
                .subscribeBy { restaurantList.onNext(it) }
                .addTo(compositeDisposable)

        }

        override fun restaurantList(): Flowable<List<BaseItem>> = restaurantList

        override fun itemClicked(item: BaseItem) {
            itemClicked.onNext(item)
        }
    }

}