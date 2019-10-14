package com.nadarm.yogiyo.ui.viewHolder

import androidx.databinding.ViewDataBinding
import androidx.recyclerview.widget.RecyclerView
import com.nadarm.yogiyo.ui.adapter.BaseListAdapter
import com.nadarm.yogiyo.ui.adapter.ItemViewHolder
import com.nadarm.yogiyo.ui.model.BaseItem

class ListItemViewHolder(
    binding: ViewDataBinding,
    delegate: BaseListAdapter.Delegate?
) : ItemViewHolder(binding, delegate) {

    private val recyclerView: RecyclerView =
        binding.root.findViewWithTag<RecyclerView>("recyclerView")

    override fun bind(item: BaseItem) {
        if (item is BaseItem.ListItem) {
            item.adapter.setRecyclerView(recyclerView)
        }
        super.bind(item)
    }
}