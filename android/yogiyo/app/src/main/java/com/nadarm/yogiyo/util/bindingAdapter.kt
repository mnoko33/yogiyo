package com.nadarm.yogiyo.util

import android.widget.ImageView
import androidx.databinding.BindingAdapter
import androidx.recyclerview.widget.RecyclerView
import androidx.recyclerview.widget.SnapHelper
import com.bumptech.glide.Glide
import com.nadarm.yogiyo.ui.adapter.BaseListAdapter


@BindingAdapter("bindImage")
fun bindImage(view: ImageView, srcId: Int) {
    Glide.with(view.context).load(srcId).into(view)
}

@BindingAdapter("bindImage")
fun bindImage(view: ImageView, imageUrl: String) {
    Glide.with(view.context).load(imageUrl).into(view)
}

@BindingAdapter("bindAdapter")
fun bindAdapter(
    view: RecyclerView,
    adapter: BaseListAdapter
) {
    adapter.setRecyclerView(view)
    view.adapter = adapter
}

@BindingAdapter("bindSnapHelper")
fun bindSnapHelper(view: RecyclerView, snapHelper: SnapHelper?) {
    snapHelper?.attachToRecyclerView(view)
}