package com.nadarm.yogiyo.ui.fragment


import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.databinding.DataBindingUtil
import com.nadarm.yogiyo.R
import com.nadarm.yogiyo.databinding.FragmentRestaurantInfoItemBinding
import com.nadarm.yogiyo.ui.adapter.BaseListAdapter
import com.nadarm.yogiyo.ui.viewModel.RestaurantDetailViewModel

class RestaurantInfoItemFragment(
    private val restaurantDetailVm: RestaurantDetailViewModel.ViewModelImpl
) : BaseItemFragment() {

    private lateinit var binding: FragmentRestaurantInfoItemBinding


    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        binding = DataBindingUtil.inflate(
            inflater,
            R.layout.fragment_restaurant_info_item,
            container,
            false
        )
        binding.lifecycleOwner = viewLifecycleOwner
        return binding.root
    }

    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)


    }

    override fun getTitle(): String = "정보"

}