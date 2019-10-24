package com.nadarm.yogiyo.ui.listener

import androidx.recyclerview.widget.GridLayoutManager
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView

open class BaseScrollListener(
    private val delegate: Delegate
) : RecyclerView.OnScrollListener() {

    var layoutManager: RecyclerView.LayoutManager? = null

    override fun onScrolled(recyclerView: RecyclerView, dx: Int, dy: Int) {
        super.onScrolled(recyclerView, dx, dy)
        layoutManager?.let {
            val position: Int = when (it) {
                is LinearLayoutManager -> it.findFirstCompletelyVisibleItemPosition()
                is GridLayoutManager -> it.findFirstCompletelyVisibleItemPosition()
                else -> 0
            }
            if (position >= 0) {
                delegate.scrollPositionChanged(position)
            }
        }
    }

    interface Delegate {
        fun scrollPositionChanged(position: Int)
    }
}