package com.nadarm.yogiyo.ui.viewHolder

import androidx.databinding.ViewDataBinding
import androidx.recyclerview.widget.RecyclerView
import com.nadarm.yogiyo.BR
import com.nadarm.yogiyo.ui.adapter.BaseListAdapter
import com.nadarm.yogiyo.ui.model.BaseItem

open class ItemViewHolder(
    private val binding: ViewDataBinding
) : RecyclerView.ViewHolder(binding.root) {

    open fun bind(item: BaseItem, delegate: BaseListAdapter.Delegate? = null) {
        if (delegate != null) {
            binding.setVariable(BR.delegate, delegate)
        }
        binding.setVariable(BR.item, item)
        binding.executePendingBindings()
    }

}