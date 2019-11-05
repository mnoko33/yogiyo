package com.nadarm.yogiyo.ui.activity

import android.os.Bundle
import android.view.ViewGroup
import androidx.core.view.marginStart
import androidx.core.view.updateLayoutParams
import androidx.core.view.updatePadding
import androidx.databinding.DataBindingUtil
import androidx.lifecycle.ViewModelProvider
import com.bumptech.glide.Glide
import com.google.android.material.appbar.AppBarLayout
import com.nadarm.yogiyo.R
import com.nadarm.yogiyo.databinding.ActivityRestaurantBinding
import com.nadarm.yogiyo.ui.adapter.BaseFragmentPagerAdapter
import com.nadarm.yogiyo.ui.fragment.RestaurantInfoItemFragment
import com.nadarm.yogiyo.ui.fragment.RestaurantMenuItemFragment
import com.nadarm.yogiyo.ui.viewModel.RestaurantDetailViewModel
import com.nadarm.yogiyo.util.subscribeMainThread
import io.reactivex.schedulers.Schedulers
import kotlinx.android.synthetic.main.activity_restaurant.*
import javax.inject.Inject
import kotlin.math.max


class RestaurantActivity : BaseActivity() {

    private lateinit var binding: ActivityRestaurantBinding
    private val density by lazy { application.resources.displayMetrics.density }

    @Inject
    lateinit var provider: ViewModelProvider

    private val restaurantDetailVm: RestaurantDetailViewModel.ViewModelImpl by lazy {
        provider[RestaurantDetailViewModel.ViewModelImpl::class.java]
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = DataBindingUtil.setContentView(this, R.layout.activity_restaurant)
        binding.lifecycleOwner = this

        initToolbar()

        val adapter: BaseFragmentPagerAdapter = BaseFragmentPagerAdapter(supportFragmentManager)
        restaurant_viewpager.adapter = adapter
        restaurant_tab_layout.setupWithViewPager(restaurant_viewpager)

        adapter.tabs = listOf(
            RestaurantMenuItemFragment(restaurantDetailVm),
            RestaurantInfoItemFragment(restaurantDetailVm)
        )


        restaurantDetailVm.outputs.restaurantInfo()
            .subscribeMainThread(Schedulers.io(), compositeDisposable) {
                toolbar_layout.title = it.name
                restaurant_detail_text_view.text = it.name
                Glide.with(restaurant_detail_image_view.context)
                    .load(it.thumbnailUrl)
                    .into(restaurant_detail_image_view)
            }

        val restaurantId = intent.getLongExtra("restaurantId", -1)
        if (restaurantId == -1L) {
            finish()
        }
        restaurantDetailVm.inputs.restaurantId(restaurantId)

    }

    private fun initToolbar() {
        setSupportActionBar(toolbar)
        app_bar.addOnOffsetChangedListener(
            object : AppBarLayout.OnOffsetChangedListener {
                private var before = -1
                override fun onOffsetChanged(appBar: AppBarLayout?, offset: Int) {
                    if (before == offset || (offset < -100 && restaurant_constraint_layout.marginStart == 0)) {
                        return
                    }
                    before = offset
                    val margin = (max(0, 100 + offset) / 5f * density).toInt()
                    val padding = (20 * density - margin).toInt()
                    restaurant_constraint_layout.updatePadding(
                        padding,
                        restaurant_constraint_layout.paddingTop,
                        padding,
                        restaurant_constraint_layout.paddingBottom
                    )
                    restaurant_tab_constraint_layout.updatePadding(
                        padding,
                        restaurant_tab_layout.paddingTop,
                        padding,
                        restaurant_tab_layout.paddingBottom
                    )
                    restaurant_tab_constraint_layout.updateLayoutParams<ViewGroup.MarginLayoutParams> {
                        marginStart = margin
                        marginEnd = margin
                    }
                    restaurant_constraint_layout.updateLayoutParams<ViewGroup.MarginLayoutParams> {
                        marginStart = margin
                        marginEnd = margin
                    }
                }
            }
        )
    }


}
