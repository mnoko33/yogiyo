package com.nadarm.yogiyo.ui.fragment

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.databinding.DataBindingUtil
import androidx.recyclerview.widget.PagerSnapHelper
import com.nadarm.yogiyo.R
import com.nadarm.yogiyo.databinding.FragmentMainFoodBinding
import com.nadarm.yogiyo.ui.adapter.AutoScrollCircularListAdapter
import com.nadarm.yogiyo.ui.adapter.BaseListAdapter
import com.nadarm.yogiyo.ui.model.*
import com.nadarm.yogiyo.ui.viewModel.AutoScrollAdViewModel
import com.nadarm.yogiyo.ui.viewModel.FoodCategoryViewModel
import com.nadarm.yogiyo.ui.viewModel.RestaurantViewModel
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.rxkotlin.addTo
import io.reactivex.schedulers.Schedulers
import javax.inject.Inject


class MainFoodFragment : BaseFragment() {

    private lateinit var binding: FragmentMainFoodBinding

//    @Inject
//    lateinit var mainAdapter: RecyclerView.Adapter<ItemViewHolder>
//
//    @Inject
//    lateinit var topAdAdapter: ListAdapter<BaseItem, ItemViewHolder>
//
//    @Inject
//    lateinit var foodCategoryAdapter: ListAdapter<BaseItem, ItemViewHolder>

    @Inject
    lateinit var topAdVm: AutoScrollAdViewModel.ViewModelImpl
    @Inject
    lateinit var foodCategoryVm: FoodCategoryViewModel.ViewModelImpl
    @Inject
    lateinit var bottomAdVm: AutoScrollAdViewModel.ViewModelImpl
    @Inject
    lateinit var plusPopularVm: RestaurantViewModel.ViewModelImpl
    @Inject
    lateinit var plusNewVm: RestaurantViewModel.ViewModelImpl

    private val mainAdapter: BaseListAdapter = BaseListAdapter()
    private val topAdAdapter: AutoScrollCircularListAdapter by lazy {
        AutoScrollCircularListAdapter(delegate = topAdVm)
    }
    private val foodCategoryAdapter: BaseListAdapter by lazy {
        BaseListAdapter(delegate = foodCategoryVm)
    }
    private val bottomAdAdapter: AutoScrollCircularListAdapter by lazy {
        AutoScrollCircularListAdapter(delegate = bottomAdVm)
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
        binding = DataBindingUtil.inflate(inflater, R.layout.fragment_main_food, container, false)
        binding.lifecycleOwner = viewLifecycleOwner
        return binding.root
    }

    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)


        val topAdSnapHelper = PagerSnapHelper()
        val bottomAdSnapHelper = PagerSnapHelper()

        binding.mainAdapter = mainAdapter

        mainAdapter.submitList(
            listOf(
                AutoScrollAdList(topAdAdapter, topAdSnapHelper),
                BaseItem.BlankItem,
                GridList(foodCategoryAdapter),
                BaseItem.BlankItem,
                AutoScrollAdList(bottomAdAdapter, bottomAdSnapHelper),
                BaseItem.BlankItem,
                PlusPopularRestaurantList(plusPopularAdapter),
                BaseItem.BlankItem,
                PlusNewRestaurantList(plusNewAdapter),
                BaseItem.BlankItem,
                BaseItem.BlankItem, BaseItem.BlankItem,
                BaseItem.BlankItem, BaseItem.BlankItem,
                BaseItem.BlankItem, BaseItem.BlankItem,
                BaseItem.BlankItem, BaseItem.BlankItem,
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


        foodCategoryVm.outputs.foodCategoryList()
            .subscribeOn(Schedulers.io())
            .observeOn(AndroidSchedulers.mainThread())
            .subscribe {
                this.submitList(it, foodCategoryAdapter)
            }
            .addTo(compositeDisposable)

        bottomAdVm.outputs.adItemList()
            .subscribeOn(Schedulers.io())
            .observeOn(AndroidSchedulers.mainThread())
            .subscribe {
                this.submitList(it, bottomAdAdapter)
            }
            .addTo(compositeDisposable)

        plusPopularVm.outputs.restaurantList()
            .subscribeOn(Schedulers.io())
            .observeOn(AndroidSchedulers.mainThread())
            .subscribe {
                this.submitList(it, plusPopularAdapter)
            }
            .addTo(compositeDisposable)

        plusNewVm.outputs.restaurantList()
            .subscribeOn(Schedulers.io())
            .observeOn(AndroidSchedulers.mainThread())
            .subscribe {
                this.submitList(it, plusNewAdapter)
            }
            .addTo(compositeDisposable)

        topAdVm.inputs.setAdType(Ad.Type.Large)
        bottomAdVm.inputs.setAdType(Ad.Type.Small)

    }

    private fun submitList(newList: List<BaseItem>, adapter: BaseListAdapter) {
        adapter.submitList(newList)
    }
}
