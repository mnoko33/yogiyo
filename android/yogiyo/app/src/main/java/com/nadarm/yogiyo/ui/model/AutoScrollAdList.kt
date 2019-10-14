package com.nadarm.yogiyo.ui.model

import androidx.recyclerview.widget.SnapHelper
import com.nadarm.yogiyo.ui.adapter.BaseListAdapter

data class AutoScrollAdList(
    override val adapter: BaseListAdapter,
    val snapHelper: SnapHelper
) : BaseItem.ListItem(adapter)