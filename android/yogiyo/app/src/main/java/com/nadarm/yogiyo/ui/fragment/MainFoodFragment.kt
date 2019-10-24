package com.nadarm.yogiyo.ui.fragment


import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import com.nadarm.yogiyo.R
import com.nadarm.yogiyo.di.ActivityScope
import javax.inject.Inject

@ActivityScope
class MainFoodFragment @Inject constructor() : Fragment() {

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.fragment_main_food, container, false)
    }

}
