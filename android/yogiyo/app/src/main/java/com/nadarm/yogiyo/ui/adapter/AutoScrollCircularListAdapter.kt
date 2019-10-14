package com.nadarm.yogiyo.ui.adapter

import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.nadarm.yogiyo.ui.model.BaseItem
import io.reactivex.Flowable
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.disposables.Disposable
import io.reactivex.schedulers.Schedulers
import java.util.concurrent.TimeUnit

class AutoScrollCircularListAdapter(
    private val delegate: Delegate
) : CircularListAdapter(delegate) {

    private var autoScrollDisposable: Disposable? = null

    override fun onDetachedFromRecyclerView(recyclerView: RecyclerView) {
        super.onDetachedFromRecyclerView(recyclerView)
        autoScrollDisposable?.dispose()
    }

    override fun onAttachedToRecyclerView(recyclerView: RecyclerView) {
        super.onAttachedToRecyclerView(recyclerView)
        val layoutManager: LinearLayoutManager = recyclerView.layoutManager as LinearLayoutManager
//        autoScroll(layoutManager.findFirstVisibleItemPosition())
    }

//    override fun setRecyclerView(recyclerView: RecyclerView) {
//        super.setRecyclerView(recyclerView)
//        if (itemCount > 1) {
//            getRecyclerView()?.let {
//                autoScroll(1)
//            }
//        }
//    }

    override fun submitList(list: MutableList<BaseItem>?) {
        super.submitList(list)
//        if (itemCount > 1) {
//            getRecyclerView()?.let {
//                autoScroll(1)
//            }
//        }
    }

    override fun createScrollListener(): CircularScrollListener {
        return AutoScrollListener(
            getRecyclerView()?.layoutManager as LinearLayoutManager,
            delegate
        )
//        { state, layoutManager ->
//            when (newState) {
//                RecyclerView.SCROLL_STATE_DRAGGING -> autoScrollDisposable?.dispose()
//                RecyclerView.SCROLL_STATE_IDLE -> autoScroll(layoutManager.findFirstVisibleItemPosition())
//            }
//        }
    }

//    private fun autoScroll(startItem: Int) {
//        autoScrollDisposable?.let {
//            if (!it.isDisposed) it.dispose()
//        }
//        autoScrollDisposable = Flowable.interval(interval, TimeUnit.MILLISECONDS)
//            .map { (it.toInt() + startItem - 1) % (itemCount - 2) + 2 }
//            .subscribeOn(Schedulers.computation())
//            .observeOn(AndroidSchedulers.mainThread())
//            .subscribe {
//                getRecyclerView()?.smoothScrollToPosition(it)
//            }
//        // TODO Error 처리 하기
//    }

    interface Delegate : CircularListAdapter.Delegate {
        fun scrollStateChanged(state: Int)
    }

    class AutoScrollListener(
        layoutManager: LinearLayoutManager,
        private val delegate: Delegate
    ) : CircularScrollListener(layoutManager, delegate) {
        override fun onScrollStateChanged(recyclerView: RecyclerView, newState: Int) {
            super.onScrollStateChanged(recyclerView, newState)
            delegate.scrollStateChanged(newState)
        }
    }
}