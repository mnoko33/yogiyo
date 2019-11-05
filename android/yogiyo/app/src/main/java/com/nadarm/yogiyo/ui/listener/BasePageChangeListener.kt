package com.nadarm.yogiyo.ui.listener

import androidx.viewpager.widget.ViewPager

class BasePageChangeListener constructor(
    private val delegate: Delegate
) : ViewPager.OnPageChangeListener {
    override fun onPageScrollStateChanged(state: Int) {}

    override fun onPageScrolled(
        position: Int,
        positionOffset: Float,
        positionOffsetPixels: Int
    ) {
    }

    override fun onPageSelected(position: Int) {
        delegate.pageSelected(position)
    }

    interface Delegate {
        fun pageSelected(position: Int)
    }
}