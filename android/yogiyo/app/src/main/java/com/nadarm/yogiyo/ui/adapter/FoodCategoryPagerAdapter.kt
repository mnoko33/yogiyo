package com.nadarm.yogiyo.ui.adapter

import androidx.fragment.app.Fragment
import androidx.fragment.app.FragmentManager
import androidx.fragment.app.FragmentStatePagerAdapter
import com.nadarm.yogiyo.ui.fragment.FoodTabItemFragment

class FoodCategoryPagerAdapter(
    fm: FragmentManager
) : FragmentStatePagerAdapter(fm, BEHAVIOR_RESUME_ONLY_CURRENT_FRAGMENT) {

    var tabs: List<FoodTabItemFragment> = emptyList()
        set(value) {
            field = value
            notifyDataSetChanged()
        }

    override fun getItem(position: Int): Fragment = tabs[position]
    override fun getCount(): Int = tabs.size
    override fun getPageTitle(position: Int): CharSequence? = tabs[position].getCategory().name
}