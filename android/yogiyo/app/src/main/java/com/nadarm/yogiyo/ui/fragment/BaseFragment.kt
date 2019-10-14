package com.nadarm.yogiyo.ui.fragment

import dagger.android.support.DaggerFragment
import io.reactivex.disposables.CompositeDisposable

abstract class BaseFragment : DaggerFragment() {

    protected val compositeDisposable = CompositeDisposable()

    override fun onDetach() {
        super.onDetach()
        compositeDisposable.clear()
    }
}