package com.nadarm.yogiyo.ui.fragment

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.databinding.DataBindingUtil
import com.nadarm.yogiyo.R
import com.nadarm.yogiyo.databinding.FragmentRestaurantMenuItemBinding
import com.nadarm.yogiyo.ui.adapter.BaseListAdapter
import com.nadarm.yogiyo.ui.model.Dish
import com.nadarm.yogiyo.ui.viewModel.RestaurantDetailViewModel
import com.nadarm.yogiyo.util.subscribeMainThread
import io.reactivex.schedulers.Schedulers

class RestaurantMenuItemFragment(
    private val restaurantDetailVm: RestaurantDetailViewModel.ViewModelImpl
) : BaseItemFragment() {

    private lateinit var binding: FragmentRestaurantMenuItemBinding
    private val dishAdapter: BaseListAdapter = BaseListAdapter(restaurantDetailVm)
    private val thumbnailDishAdapter: BaseListAdapter = BaseListAdapter(restaurantDetailVm)

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        binding = DataBindingUtil.inflate(
            inflater,
            R.layout.fragment_restaurant_menu_item,
            container,
            false
        )
        binding.lifecycleOwner = viewLifecycleOwner
        return binding.root
    }

    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)

        binding.thumbnailDishAdapter = thumbnailDishAdapter
        binding.dishAdapter = dishAdapter

        restaurantDetailVm.outputs.showDishDetail()

        restaurantDetailVm.outputs.dishItems()
            .subscribeMainThread(Schedulers.io(), compositeDisposable) {
                dishAdapter.submitList(it)
            }

        restaurantDetailVm.outputs.showDishDetail()
            .subscribeMainThread(
                Schedulers.computation(),
                compositeDisposable,
                this::showDishDetail
            )


    }

    override fun getTitle(): String = "메뉴"

    private fun showDishDetail(dish: Dish) {
        val dialog = OrderBottomSheetDialogFragment(dish, restaurantDetailVm)
        dialog.show(childFragmentManager, "orderDialog")
    }
}