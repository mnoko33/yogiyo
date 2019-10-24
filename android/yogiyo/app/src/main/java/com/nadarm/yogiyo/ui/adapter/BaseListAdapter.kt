package com.nadarm.yogiyo.ui.adapter

import android.view.ViewGroup
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import com.nadarm.yogiyo.ui.model.BaseItem
import com.nadarm.yogiyo.ui.viewHolder.ItemViewHolder
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

    fun setRecyclerView(recyclerView: RecyclerView) {
        this.recyclerView = recyclerView
    }

    override fun getItemViewType(position: Int): Int {
        return ViewHolderFactory.getItemViewType(getItem(position))
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ItemViewHolder {
        return ViewHolderFactory.createViewHolder(parent, viewType)
    }

    override fun onBindViewHolder(holder: ItemViewHolder, position: Int) {
        val item = getItem(position)
        holder.bind(item, delegate)
    }

    fun lastScrollPosition() {
        getRecyclerView()?.layoutManager?.let {
            if (it is LinearLayoutManager) {
                delegate?.lastScrollPosition(it.findFirstCompletelyVisibleItemPosition())
            }
        }
    }

    interface Delegate {
        fun itemClicked(item: BaseItem)
        fun lastScrollPosition(position: Int) // TODO 인터페이스 분리 필요함
    }


}