package com.nadarm.yogiyo.ui.viewHolder

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.databinding.DataBindingUtil
import androidx.databinding.ViewDataBinding
import com.nadarm.yogiyo.R
import com.nadarm.yogiyo.ui.model.*


object ViewHolderFactory {

    fun createViewHolder(
        parent: ViewGroup,
        viewType: Int
    ): ItemViewHolder {
        val inflater: LayoutInflater = LayoutInflater.from(parent.context)
        val binding: ViewDataBinding = DataBindingUtil.inflate(inflater, viewType, parent, false)

        return ItemViewHolder(binding)
//        return when (viewType) {
//            R.layout.item_plus_new_restaurant_list,
//            R.layout.item_plus_popular_restaurant_list,
//            R.layout.item_grid_list,
//            R.layout.item_auto_scroll_ad_list -> ListItemViewHolder(binding)
//            else -> ItemViewHolder(binding)
//    }
    }

    fun getItemViewType(item: BaseItem): Int = when (item) {
        is Ad -> when (item.type) {
            Ad.Type.Large -> R.layout.item_ad_large
            Ad.Type.Small -> R.layout.item_ad_small
        }
        is FoodCategory -> R.layout.item_food_category
        is PlusRestaurant -> R.layout.item_plus_restaurant_thumbnail
        is Restaurant -> R.layout.item_restaurant_thumbnail
        is PlusNewRestaurantList -> R.layout.item_plus_new_restaurant_list
        is PlusPopularRestaurantList -> R.layout.item_plus_popular_restaurant_list
        is GridList -> R.layout.item_grid_list
        is AutoScrollAdList -> R.layout.item_auto_scroll_ad_list
        else -> R.layout.item_blank
    }

    fun areSame(oldItem: BaseItem, newItem: BaseItem): Boolean {
        return when (oldItem) {
            is Ad -> oldItem.id == (newItem as Ad).id
            is FoodCategory -> oldItem.id == (newItem as FoodCategory).id
            is Restaurant -> oldItem.id == (newItem as Restaurant).id
            is BaseItem.ListItem -> oldItem.adapter == (newItem as BaseItem.ListItem).adapter
            else -> true
        }


    }

}