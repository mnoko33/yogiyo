package com.nadarm.yogiyo.ui.viewModel

import com.nadarm.yogiyo.data.repository.FoodCategoryRepository
import com.nadarm.yogiyo.ui.adapter.BaseListAdapter
import com.nadarm.yogiyo.ui.model.BaseItem
import io.reactivex.Flowable
import io.reactivex.processors.BehaviorProcessor
import io.reactivex.processors.PublishProcessor
import io.reactivex.rxkotlin.addTo
import io.reactivex.rxkotlin.subscribeBy
import javax.inject.Inject

interface FoodCategoryViewModel {

    interface Inputs : BaseListAdapter.Delegate

    interface Outputs {
        fun foodCategoryList(): Flowable<List<BaseItem>>
    }

    class ViewModelImpl @Inject constructor(
        private val foodCategoryRepo: FoodCategoryRepository
    ) : BaseViewModel(), Inputs, Outputs {

        private val itemClicked: PublishProcessor<BaseItem> = PublishProcessor.create()

        private val foodCategoryList: BehaviorProcessor<List<BaseItem>> =
            BehaviorProcessor.create()

        val inputs: Inputs = this
        val outputs: Outputs = this

        init {
            foodCategoryRepo.getCategories()
                .subscribeBy { foodCategoryList.onNext(it) }
                .addTo(compositeDisposable)

        }

        override fun foodCategoryList(): Flowable<List<BaseItem>> = foodCategoryList

        override fun itemClicked(item: BaseItem) {
            itemClicked.onNext(item)
        }
    }

}