package com.nadarm.yogiyo.ui.fragment

import android.content.Context
import android.os.Bundle
import androidx.navigation.fragment.NavHostFragment
import com.nadarm.yogiyo.di.InjectingFragmentFactory
import dagger.android.support.AndroidSupportInjection
import javax.inject.Inject

class InjectingNavHostFragment : NavHostFragment() {

    @Inject
    protected lateinit var daggerFragmentInjectionFactory: InjectingFragmentFactory

    override fun onAttach(context: Context) {
        AndroidSupportInjection.inject(this)
        super.onAttach(context)
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        childFragmentManager.fragmentFactory = daggerFragmentInjectionFactory
        super.onCreate(savedInstanceState)
    }
}