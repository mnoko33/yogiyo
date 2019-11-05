package com.nadarm.yogiyo.ui.viewModel

import com.nadarm.yogiyo.data.repository.FoodCategoryRepository
import com.nadarm.yogiyo.ui.adapter.BaseListAdapter
import com.nadarm.yogiyo.ui.model.BaseItem
import com.nadarm.yogiyo.ui.model.FoodCategory
import io.reactivex.Flowable
import io.reactivex.processors.BehaviorProcessor
import io.reactivex.processors.PublishProcessor
import io.reactivex.rxkotlin.addTo
import io.reactivex.rxkotlin.subscribeBy
import io.reactivex.rxkotlin.withLatestFrom
import io.reactivex.schedulers.Schedulers
import java.util.concurrent.TimeUnit
import javax.inject.Inject

interface FoodCategoryViewModel {

    interface Inputs : BaseListAdapter.Delegate {
        fun pageSelected(categoryId: Long)
    }

    interface Outputs {
        fun foodCategoryList(): Flowable<List<BaseItem>>
        fun navigateCategoryTab(): Flowable<FoodCategory>
        fun changePagePosition(): Flowable<Int>
    }

    class ViewModelImpl @Inject constructor(
        private val foodCategoryRepo: FoodCategoryRepository,
        stringMap: Map<String, String> // TODO token 처리
    ) : BaseViewModel(), Inputs, Outputs {

        private val itemClicked: PublishProcessor<BaseItem> = PublishProcessor.create()
        private val pageSelected: PublishProcessor<Long> = PublishProcessor.create()

        private val foodCategoryList: BehaviorProcessor<List<BaseItem>> = BehaviorProcessor.create()
        private val navigateCategoryTab: Flowable<FoodCategory>
        private val changePagePosition: BehaviorProcessor<Int> = BehaviorProcessor.create()

        private val token = stringMap["token"] ?: error("token is not provided") // TODO token 처리
        private val baseUrl =
            stringMap["baseUrl"] ?: error("baseUrl is not provided") // TODO baseUrl 처리

        val inputs: Inputs = this
        val outputs: Outputs = this

        init {
            foodCategoryRepo.getCategories(token, baseUrl)
                .subscribeOn(Schedulers.io())
                .subscribeBy { foodCategoryList.onNext(it) }
                .addTo(compositeDisposable)

            navigateCategoryTab = itemClicked
                .throttleFirst(1000, TimeUnit.MILLISECONDS)
                .map { it as FoodCategory }

            pageSelected
                .withLatestFrom(foodCategoryList) { id, list ->
                    list.indexOfFirst { (it as FoodCategory).id == id }
                }
                .subscribe(changePagePosition)
        }

        override fun foodCategoryList(): Flowable<List<BaseItem>> = foodCategoryList
        override fun navigateCategoryTab(): Flowable<FoodCategory> = navigateCategoryTab
        override fun changePagePosition(): Flowable<Int> = changePagePosition

        override fun itemClicked(item: BaseItem) {
            itemClicked.onNext(item)
        }

        override fun lastScrollPosition(position: Int) {
            // TODO 인터페이스 분리 필요함
        }

        override fun pageSelected(categoryId: Long) {
            pageSelected.onNext(categoryId)
        }
    }

}