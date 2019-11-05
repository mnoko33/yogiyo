package com.nadarm.yogiyo.ui.fragment

import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.databinding.DataBindingUtil
import com.google.android.material.bottomsheet.BottomSheetDialogFragment
import com.nadarm.yogiyo.R
import com.nadarm.yogiyo.databinding.FragmentBottomSheetDialogBinding
import com.nadarm.yogiyo.ui.activity.PaymentActivity
import com.nadarm.yogiyo.ui.model.Dish
import com.nadarm.yogiyo.ui.viewModel.RestaurantDetailViewModel
import com.nadarm.yogiyo.util.subscribeMainThread
import io.reactivex.disposables.CompositeDisposable
import io.reactivex.schedulers.Schedulers

class OrderBottomSheetDialogFragment constructor(
    private val dish: Dish,
    private val paymentVm: RestaurantDetailViewModel.ViewModelImpl
) : BottomSheetDialogFragment() {

    private lateinit var binding: FragmentBottomSheetDialogBinding
    private val compositeDisposable = CompositeDisposable()

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        binding = DataBindingUtil.inflate(
            inflater,
            R.layout.fragment_bottom_sheet_dialog,
            container,
            false
        )
        binding.lifecycleOwner = viewLifecycleOwner
        return binding.root
    }

    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)
        binding.item = dish
        binding.delegate = paymentVm


        paymentVm.outputs.openPayment()
            .subscribeMainThread(Schedulers.io(), compositeDisposable) {
                val intent = Intent(context, PaymentActivity::class.java)
                intent.putExtra("paymentUrl", it)
                startActivity(intent)
                dismiss()
            }

    }

    override fun onDestroyView() {
        super.onDestroyView()
        compositeDisposable.clear()
    }

    interface Delegate {
        fun requestPayment(dish: Dish)
    }
}