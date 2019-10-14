package com.nadarm.yogiyo.ui.adapter

import androidx.databinding.ViewDataBinding
import androidx.recyclerview.widget.RecyclerView
import com.nadarm.yogiyo.BR
import com.nadarm.yogiyo.ui.model.BaseItem


open class ItemViewHolder(
    private val binding: ViewDataBinding,
    private val delegate: BaseListAdapter.Delegate?
) : RecyclerView.ViewHolder(binding.root) {

    open fun bind(item: BaseItem) {
        if (delegate != null) {
            binding.setVariable(BR.delegate, delegate)
        }
        binding.setVariable(BR.item, item)
        binding.executePendingBindings()
    }

}