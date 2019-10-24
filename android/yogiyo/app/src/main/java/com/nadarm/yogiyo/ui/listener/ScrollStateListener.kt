package com.nadarm.yogiyo.ui.listener

import androidx.recyclerview.widget.RecyclerView

class ScrollStateListener(
    private val delegate: Delegate
) : BaseScrollListener(delegate) {

    override fun onScrollStateChanged(recyclerView: RecyclerView, newState: Int) {
        super.onScrollStateChanged(recyclerView, newState)
        delegate.scrollStateChanged(newState)
    }

    interface Delegate : BaseScrollListener.Delegate {
        fun scrollStateChanged(state: Int)
    }

}