package com.nadarm.yogiyo.ui.model

import com.nadarm.yogiyo.ui.adapter.BaseListAdapter

sealed class BaseItem {

    abstract class ListItem(
        open val adapter: BaseListAdapter
    ) : BaseItem()

    abstract class SingleItem : BaseItem()

    object BlankItem : BaseItem()

}
