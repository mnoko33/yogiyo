package com.nadarm.yogiyo.ui.model

import androidx.recyclerview.widget.SnapHelper
import com.nadarm.yogiyo.ui.adapter.BaseListAdapter
import com.nadarm.yogiyo.ui.listener.BaseScrollListener

data class AutoScrollAdList(
    override val adapter: BaseListAdapter,
    val snapHelper: SnapHelper,
    val scrollListener: BaseScrollListener
) : BaseItem.ListItem(adapter)