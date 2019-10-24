package com.nadarm.yogiyo.ui.viewModel

import android.view.View
import com.nadarm.yogiyo.ui.listener.BaseScrollListener
import io.reactivex.Flowable
import io.reactivex.processors.BehaviorProcessor
import io.reactivex.processors.PublishProcessor
import java.util.concurrent.TimeUnit
import javax.inject.Inject

interface TopScrollVIewModel {

    interface Inputs : BaseScrollListener.Delegate {
        fun topButtonClicked()
    }

    interface Outputs {
        fun scrollToTop(): Flowable<Unit>
        fun visibility(): Flowable<Int>
    }


    class ViewModelImpl @Inject constructor() : BaseViewModel(), Inputs, Outputs {

        private val scrollPositionChanged: PublishProcessor<Int> = PublishProcessor.create()
        private val topButtonClicked: PublishProcessor<Unit> = PublishProcessor.create()

        private val scrollToTop: BehaviorProcessor<Unit> = BehaviorProcessor.create()
        private val visibility: BehaviorProcessor<Int> = BehaviorProcessor.createDefault(View.GONE)

        val inputs: Inputs = this
        val outputs: Outputs = this


        init {
            scrollPositionChanged
                .map { position ->
                    if (position == 0) {
                        View.GONE
                    } else {
                        View.VISIBLE
                    }
                }
                .subscribe(visibility)

            topButtonClicked
                .throttleFirst(500, TimeUnit.MILLISECONDS)
                .subscribe(scrollToTop)
        }

        override fun scrollToTop(): Flowable<Unit> = scrollToTop
        override fun visibility(): Flowable<Int> = visibility

        override fun scrollPositionChanged(position: Int) {
            scrollPositionChanged.onNext(position)
        }

        override fun topButtonClicked() {
            topButtonClicked.onNext(Unit)
        }
    }
}