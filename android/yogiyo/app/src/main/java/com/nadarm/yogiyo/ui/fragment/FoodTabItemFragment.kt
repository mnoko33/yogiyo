package com.nadarm.yogiyo.ui.fragment


import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.databinding.DataBindingUtil
import com.nadarm.yogiyo.R
import com.nadarm.yogiyo.databinding.FragmentFoodTabItemBinding
import com.nadarm.yogiyo.ui.activity.RestaurantActivity
import com.nadarm.yogiyo.ui.adapter.BaseListAdapter
import com.nadarm.yogiyo.ui.listener.BaseScrollListener
import com.nadarm.yogiyo.ui.model.BaseItem
import com.nadarm.yogiyo.ui.model.FoodCategory
import com.nadarm.yogiyo.ui.model.Restaurant
import com.nadarm.yogiyo.ui.viewModel.RestaurantViewModel
import com.nadarm.yogiyo.ui.viewModel.TopScrollVIewModel
import com.nadarm.yogiyo.util.subscribeMainThread
import io.reactivex.rxkotlin.addTo
import io.reactivex.schedulers.Schedulers
import kotlinx.android.synthetic.main.fragment_food_tab_item.*


class FoodTabItemFragment(
    private val category: FoodCategory,
    private val restaurantVm: RestaurantViewModel.ViewModelImpl,
    private val topScrollVm: TopScrollVIewModel.ViewModelImpl
) : BaseItemFragment() {

    private lateinit var binding: FragmentFoodTabItemBinding
    private val adapter: BaseListAdapter = BaseListAdapter(restaurantVm)
    private val scrollListener: BaseScrollListener = BaseScrollListener(topScrollVm)

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        binding =
            DataBindingUtil.inflate(inflater, R.layout.fragment_food_tab_item, container, false)
        binding.lifecycleOwner = viewLifecycleOwner
        return binding.root
    }

    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)

        binding.adapter = adapter
        binding.scrollListener = scrollListener
        binding.topButtonDelegate = topScrollVm

        restaurantVm.outputs.restaurantList()
            .map { it.toMutableList() }
            .map {
                it.apply {
                    add(0, BaseItem.BlankItem)
                    add(BaseItem.BlankItem)
                }
            }
            .subscribeMainThread(Schedulers.io(), compositeDisposable) {
                adapter.submitList(it)
            }

        restaurantVm.outputs.startRestaurantActivity()
            .subscribeMainThread(
                Schedulers.computation(), compositeDisposable, this::startRestaurantActivity
            )
        topScrollVm.outputs.scrollToTop()
            .subscribe { restaurantsRecyclerView.scrollToPosition(0) }
            .addTo(compositeDisposable)

        topScrollVm.outputs.visibility()
            .subscribeMainThread(Schedulers.computation(), compositeDisposable) {
                go_to_top_button.visibility = it
            }

        restaurantVm.inputs.isPlus(false)
        restaurantVm.inputs.category(category.id)
    }

    private fun startRestaurantActivity(restaurant: Restaurant) {
        val intent = Intent(context, RestaurantActivity::class.java)
        intent.putExtra("restaurantId", restaurant.id)
        startActivity(intent)
    }

    override fun getTitle(): String {
        return category.name
    }
}
