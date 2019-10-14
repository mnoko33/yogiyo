package com.nadarm.yogiyo.ui.adapter

import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView

open class CircularListAdapter(
    private val delegate: Delegate? = null
) : BaseListAdapter(delegate) {

    private var scrollListener: CircularScrollListener? = null

    override fun setRecyclerView(recyclerView: RecyclerView) {
        super.setRecyclerView(recyclerView)
        addScrollListener()
    }

    private fun addScrollListener() {
        scrollListener?.let {
            getRecyclerView()?.removeOnScrollListener(it)
        }
        scrollListener = createScrollListener().also {
            getRecyclerView()?.addOnScrollListener(it)
        }
    }

    open fun createScrollListener() =
        CircularScrollListener(
            getRecyclerView()?.layoutManager as LinearLayoutManager,
            delegate
        )

    interface Delegate : BaseListAdapter.Delegate {
        fun scrollPositionChanged(position: Int)
    }

    open class CircularScrollListener(
        private val layoutManager: LinearLayoutManager,
        private val delegate: Delegate?
    ) : RecyclerView.OnScrollListener() {
        override fun onScrolled(recyclerView: RecyclerView, dx: Int, dy: Int) {
            super.onScrolled(recyclerView, dx, dy)
            delegate?.scrollPositionChanged(layoutManager.findFirstVisibleItemPosition())
        }
    }
}