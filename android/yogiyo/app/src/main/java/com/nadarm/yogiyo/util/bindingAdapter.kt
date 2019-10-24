package com.nadarm.yogiyo.util

import android.widget.ImageView
import androidx.databinding.BindingAdapter
import androidx.recyclerview.widget.RecyclerView
import androidx.recyclerview.widget.SnapHelper
import com.bumptech.glide.Glide
import com.nadarm.yogiyo.ui.adapter.BaseListAdapter
import com.nadarm.yogiyo.ui.listener.BaseScrollListener


@BindingAdapter("bindImage")
fun bindImage(view: ImageView, srcId: Int) {
    Glide.with(view.context).load(srcId).override(view.width, view.height).into(view)
}

@BindingAdapter("bindImage")
fun bindImage(view: ImageView, imageUrl: String) {
    Glide.with(view.context).load(imageUrl).into(view)
}

@BindingAdapter("bindAdapter", "bindScrollListener", "bindSnapHelper", requireAll = false)
fun bindAdapter(
    view: RecyclerView,
    adapter: BaseListAdapter,
    scrollListener: BaseScrollListener?,
    snapHelper: SnapHelper?
) {
    if (view.adapter == null) {
        view.adapter = adapter
        adapter.setRecyclerView(view)

        scrollListener?.let {
            view.clearOnScrollListeners()
            view.addOnScrollListener(it)
            it.layoutManager = view.layoutManager
        }

        if (view.onFlingListener == null) {
            snapHelper?.attachToRecyclerView(view)
        }
    }
}

