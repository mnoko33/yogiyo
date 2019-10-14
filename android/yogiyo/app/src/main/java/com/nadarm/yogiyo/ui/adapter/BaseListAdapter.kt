package com.nadarm.yogiyo.ui.adapter

import android.view.ViewGroup
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import com.nadarm.yogiyo.ui.model.BaseItem
import com.nadarm.yogiyo.ui.viewHolder.ViewHolderFactory

open class BaseListAdapter(
    private val delegate: Delegate? = null
) : ListAdapter<BaseItem, ItemViewHolder>(

    object : DiffUtil.ItemCallback<BaseItem>() {
        override fun areItemsTheSame(oldItem: BaseItem, newItem: BaseItem): Boolean {
            return ViewHolderFactory.getItemViewType(oldItem) ==
                    ViewHolderFactory.getItemViewType(newItem)
        }

        override fun areContentsTheSame(oldItem: BaseItem, newItem: BaseItem): Boolean {
            return ViewHolderFactory.areSame(oldItem, newItem)
        }
    }
) {
    private var recyclerView: RecyclerView? = null

    fun getRecyclerView(): RecyclerView? = recyclerView

    open fun setRecyclerView(recyclerView: RecyclerView) {
        this.recyclerView = recyclerView
    }

    override fun getItemViewType(position: Int): Int {
        return ViewHolderFactory.getItemViewType(getItem(position))
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ItemViewHolder {
        return ViewHolderFactory.createViewHolder(parent, viewType, delegate)
    }

    override fun onBindViewHolder(holder: ItemViewHolder, position: Int) {
        val item = getItem(position)
        holder.bind(item)
    }

    override fun onViewDetachedFromWindow(holder: ItemViewHolder) {
        super.onViewDetachedFromWindow(holder)
    }

    interface Delegate {
        fun itemClicked(item: BaseItem)
    }
}