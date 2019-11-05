package com.nadarm.yogiyo.ui.fragment

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.databinding.DataBindingUtil
import androidx.lifecycle.ViewModelProvider
import com.nadarm.yogiyo.R
import com.nadarm.yogiyo.databinding.FragmentFoodTabBinding
import com.nadarm.yogiyo.ui.adapter.BaseFragmentPagerAdapter
import com.nadarm.yogiyo.ui.model.FoodCategory
import com.nadarm.yogiyo.ui.viewModel.FoodCategoryViewModel
import com.nadarm.yogiyo.ui.viewModel.RestaurantViewModel
import com.nadarm.yogiyo.ui.viewModel.TopScrollVIewModel
import com.nadarm.yogiyo.util.subscribeMainThread
import io.reactivex.schedulers.Schedulers
import kotlinx.android.synthetic.main.fragment_food_tab.*
import java.util.concurrent.TimeUnit
import javax.inject.Inject


class FoodTabFragment @Inject constructor(
    private val provider: ViewModelProvider
) : BaseFragment() {

    private lateinit var binding: FragmentFoodTabBinding

    private val foodCategoryVm: FoodCategoryViewModel.ViewModelImpl by lazy {
        provider.get("foodCategoryVm", FoodCategoryViewModel.ViewModelImpl::class.java)
    }


    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        binding = DataBindingUtil.inflate(inflater, R.layout.fragment_food_tab, container, false)
        binding.lifecycleOwner = viewLifecycleOwner
        return binding.root
    }

    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)

        val manager = childFragmentManager
        val adapter = BaseFragmentPagerAdapter(manager)
        viewPager.adapter = adapter
        tabLayout.setupWithViewPager(viewPager)

        foodCategoryVm.outputs.foodCategoryList()
            .map {
                it.map { item ->
                    item as FoodCategory
                    val key = item.id.toString()
                    FoodTabItemFragment(
                        item,
                        provider[key, RestaurantViewModel.ViewModelImpl::class.java],
                        provider[key, TopScrollVIewModel.ViewModelImpl::class.java]
                    )
                }
            }
            .subscribeMainThread(Schedulers.io(), compositeDisposable) { adapter.tabs = it }


        // TODO 선택된 카테고리 탭에서 시작
        // TODO 선택된 카테고리 탭 유지하기
        foodCategoryVm.outputs.changePagePosition()
            .delay(100, TimeUnit.MILLISECONDS)
            .subscribeMainThread(Schedulers.computation(), compositeDisposable) {
                viewPager.currentItem = it
            }
        arguments?.let {
            foodCategoryVm.inputs.pageSelected(it["category"] as Long)
        }


    }
}
