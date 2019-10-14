package com.nadarm.yogiyo.ui.model

import com.nadarm.yogiyo.ui.adapter.BaseListAdapter

data class PlusPopularRestaurantList(
    override val adapter: BaseListAdapter
) : BaseItem.ListItem(adapter)