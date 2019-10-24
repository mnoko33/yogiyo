package com.nadarm.yogiyo.ui.fragment

import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.core.os.bundleOf
import androidx.databinding.DataBindingUtil
import androidx.lifecycle.ViewModelProvider
import androidx.navigation.fragment.findNavController
import androidx.recyclerview.widget.PagerSnapHelper
import androidx.recyclerview.widget.RecyclerView
import com.nadarm.yogiyo.R
import com.nadarm.yogiyo.databinding.FragmentFoodHomeBinding
import com.nadarm.yogiyo.di.ActivityScope
import com.nadarm.yogiyo.ui.activity.AdActivity
import com.nadarm.yogiyo.ui.activity.RestaurantActivity
import com.nadarm.yogiyo.ui.adapter.BaseListAdapter
import com.nadarm.yogiyo.ui.listener.BaseScrollListener
import com.nadarm.yogiyo.ui.listener.ScrollStateListener
import com.nadarm.yogiyo.ui.model.*
import com.nadarm.yogiyo.ui.viewModel.AutoScrollAdViewModel
import com.nadarm.yogiyo.ui.viewModel.FoodCategoryViewModel
import com.nadarm.yogiyo.ui.viewModel.RestaurantViewModel
import com.nadarm.yogiyo.util.subscribeMainThread
import io.reactivex.Flowable
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.rxkotlin.addTo
import io.reactivex.schedulers.Schedulers
import java.util.concurrent.TimeUnit
import javax.inject.Inject

@ActivityScope
class FoodHomeFragment @Inject constructor(
    private val provider: ViewModelProvider
) : BaseFragment() {

    private lateinit var binding: FragmentFoodHomeBinding

    private val topAdVm: AutoScrollAdViewModel.ViewModelImpl by lazy {
        provider.get("topAdVm", AutoScrollAdViewModel.ViewModelImpl::class.java)
    }
    private val foodCategoryVm: FoodCategoryViewModel.ViewModelImpl by lazy {
        provider.get("foodCategoryVm", FoodCategoryViewModel.ViewModelImpl::class.java)
    }
    private val bottomAdVm: AutoScrollAdViewModel.ViewModelImpl by lazy {
        provider.get("bottomAdVm", AutoScrollAdViewModel.ViewModelImpl::class.java)
    }
    private val plusPopularVm: RestaurantViewModel.ViewModelImpl by lazy {
        provider.get("plusPopularVm", RestaurantViewModel.ViewModelImpl::class.java)
    }
    private val plusNewVm: RestaurantViewModel.ViewModelImpl by lazy {
        provider.get("plusNewVm", RestaurantViewModel.ViewModelImpl::class.java)
    }

    private val mainAdapter: BaseListAdapter = BaseListAdapter()
    private val topAdAdapter: BaseListAdapter by lazy {
        BaseListAdapter(delegate = topAdVm)
    }
    private val topAdScrollListener: BaseScrollListener by lazy {
        ScrollStateListener(topAdVm)
    }
    private val foodCategoryAdapter: BaseListAdapter by lazy {
        BaseListAdapter(delegate = foodCategoryVm)
    }
    private val bottomAdAdapter: BaseListAdapter by lazy {
        BaseListAdapter(delegate = bottomAdVm)
    }
    private val bottomAdScrollListener: BaseScrollListener by lazy {
        ScrollStateListener(bottomAdVm)
    }
    private val plusPopularAdapter: BaseListAdapter by lazy {
        BaseListAdapter(delegate = plusPopularVm)
    }
    private val plusNewAdapter: BaseListAdapter by lazy {
        BaseListAdapter(delegate = plusNewVm)
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        binding = DataBindingUtil.inflate(inflater, R.layout.fragment_food_home, container, false)
        binding.lifecycleOwner = viewLifecycleOwner
        return binding.root
    }

    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)

        val topAdSnapHelper = PagerSnapHelper()
        val bottomAdSnapHelper = PagerSnapHelper()

        binding.mainAdapter = mainAdapter
        binding.mainRecyclerView.setItemViewCacheSize(10)

        mainAdapter.submitList(
            listOf(
                AutoScrollAdList(topAdAdapter, topAdSnapHelper, topAdScrollListener),
                BaseItem.BlankItem,
                GridList(foodCategoryAdapter),
                BaseItem.BlankItem,
                AutoScrollAdList(bottomAdAdapter, bottomAdSnapHelper, bottomAdScrollListener),
                BaseItem.BlankItem,
                PlusPopularRestaurantList(plusPopularAdapter),
                BaseItem.BlankItem,
                PlusNewRestaurantList(plusNewAdapter),
                BaseItem.BlankItem
            )
        )

        topAdVm.outputs.adItemList()
            .subscribeOn(Schedulers.io())
            .observeOn(AndroidSchedulers.mainThread())
            .subscribe {
                this.submitList(it, topAdAdapter)
            }
            .addTo(compositeDisposable)

        topAdVm.outputs.scrollPosition()
            .subscribeOn(Schedulers.computation())
            .observeOn(AndroidSchedulers.mainThread())
            .subscribe { position ->
                topAdAdapter.getRecyclerView()?.scrollToPosition(position)
            }
            .addTo(compositeDisposable)

        topAdVm.outputs.smoothScrollPosition()
            .subscribeOn(Schedulers.computation())
            .observeOn(AndroidSchedulers.mainThread())
            .subscribe { position ->
                topAdAdapter.getRecyclerView()?.smoothScrollToPosition(position)
            }
            .addTo(compositeDisposable)

        foodCategoryVm.outputs.foodCategoryList()
            .subscribeOn(Schedulers.io())
            .observeOn(AndroidSchedulers.mainThread())
            .subscribe {
                this.submitList(it, foodCategoryAdapter)
            }
            .addTo(compositeDisposable)

        foodCategoryVm.outputs.navigateCategoryTab()
            .subscribeMainThread(Schedulers.computation(), compositeDisposable, this::navigate)

        bottomAdVm.outputs.adItemList()
            .subscribeOn(Schedulers.io())
            .observeOn(AndroidSchedulers.mainThread())
            .subscribe {
                this.submitList(it, bottomAdAdapter)
            }
            .addTo(compositeDisposable)

        bottomAdVm.outputs.scrollPosition()
            .subscribeOn(Schedulers.computation())
            .observeOn(AndroidSchedulers.mainThread())
            .subscribe { position ->
                bottomAdAdapter.getRecyclerView()?.scrollToPosition(position)
            }
            .addTo(compositeDisposable)

        bottomAdVm.outputs.smoothScrollPosition()
            .subscribeOn(Schedulers.computation())
            .observeOn(AndroidSchedulers.mainThread())
            .subscribe { position ->
                bottomAdAdapter.getRecyclerView()?.smoothScrollToPosition(position)
            }
            .addTo(compositeDisposable)

        plusPopularVm.outputs.restaurantList()
            .map { it.map { item -> item as PlusRestaurant } }
            .map {
                it
            }
            .subscribeMainThread(Schedulers.io(), compositeDisposable) {
                this.submitList(it, plusPopularAdapter)
            }

        plusPopularVm.outputs.scrollPosition()
            .subscribeOn(Schedulers.computation())
            .observeOn(AndroidSchedulers.mainThread())
            .subscribe { position ->
                plusPopularAdapter.getRecyclerView()?.scrollToPosition(position)
            }
            .addTo(compositeDisposable)

        plusNewVm.outputs.restaurantList()
            .map { it.map { item -> item as PlusRestaurant } }
            .subscribeMainThread(Schedulers.io(), compositeDisposable) {
                this.submitList(it, plusNewAdapter)
            }

        plusNewVm.outputs.scrollPosition()
            .subscribeMainThread(Schedulers.computation(), compositeDisposable) { position ->
                plusNewAdapter.getRecyclerView()?.scrollToPosition(position)
            }

        Flowable
            .merge(
                topAdVm.outputs.startAdActivity(),
                bottomAdVm.outputs.startAdActivity()
            )
            .throttleFirst(1000, TimeUnit.MILLISECONDS)
            .subscribeMainThread(
                Schedulers.computation(),
                compositeDisposable,
                this::startAdActivity
            )

        Flowable
            .merge(
                plusPopularVm.outputs.startRestaurantActivity(),
                plusNewVm.outputs.startRestaurantActivity()
            )
            .throttleFirst(1000, TimeUnit.MILLISECONDS)
            .subscribeMainThread(
                Schedulers.computation(),
                compositeDisposable,
                this::startRestaurantActivity
            )

        topAdVm.inputs.setAdType(Ad.Type.Large)
        topAdVm.inputs.scrollStateChanged(RecyclerView.SCROLL_STATE_IDLE)
        bottomAdVm.inputs.setAdType(Ad.Type.Small)
        bottomAdVm.inputs.scrollStateChanged(RecyclerView.SCROLL_STATE_IDLE)
        plusNewVm.inputs.isPlus(true)
        plusNewVm.inputs.category(1)
        plusPopularVm.inputs.isPlus(true)
        plusPopularVm.inputs.category(1)

    }

    override fun onPause() {
        topAdAdapter.lastScrollPosition()
        bottomAdAdapter.lastScrollPosition()
        plusPopularAdapter.lastScrollPosition()
        plusNewAdapter.lastScrollPosition()
        super.onPause()
    }

    private fun submitList(newList: List<BaseItem>, adapter: BaseListAdapter) {
        adapter.submitList(newList)
    }

    private fun navigate(category: FoodCategory) {
        val arg = bundleOf("category" to category.id)
        findNavController().navigate(R.id.action_foodHomeFragment_to_foodTabFragment, arg)
    }

    private fun startAdActivity(ad: Ad) {
        val intent = Intent(context, AdActivity::class.java)
        intent.putExtra("adId", ad.id)
        intent.putExtra("pageUrl", ad.pageUrl)
        startActivity(intent)
    }

    private fun startRestaurantActivity(restaurant: Restaurant) {
        val intent = Intent(context, RestaurantActivity::class.java)
        intent.putExtra("restaurantId", restaurant.id)
        startActivity(intent)
    }
}
