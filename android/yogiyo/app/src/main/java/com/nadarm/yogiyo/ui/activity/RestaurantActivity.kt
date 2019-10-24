package com.nadarm.yogiyo.ui.activity

import android.os.Bundle
import androidx.databinding.DataBindingUtil
import com.nadarm.yogiyo.R
import com.nadarm.yogiyo.databinding.ActivityRestaurantBinding
import com.nadarm.yogiyo.ui.model.Restaurant
import kotlinx.android.synthetic.main.activity_restaurant.*


class RestaurantActivity : BaseActivity() {

    private lateinit var binding: ActivityRestaurantBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = DataBindingUtil.setContentView(this, R.layout.activity_restaurant)
        binding.lifecycleOwner = this

        binding.restaurant = Restaurant(
            1,
            "카페마마스 잠실점",
            arrayOf("야식", "프렌차이즈", "한식"),
            "https://i.imgur.com/dlFdn4F.png",
            "역삼동",
            127.029799209808,
            37.4970170754811,
            "11:00 - 01:00",
            60,
            "구이삼겹 1인, 구이삼겹 2인",
            2000,
            12000,
            "creditcard::online",
            "2019-10-15T13:48:47.000Z",
            "2019-10-15T13:48:47.000Z",
            true
        )

        setSupportActionBar(toolbar)

        val restaurantId = intent.getLongExtra("restaurantId", -1)
        if (restaurantId == -1L) {
            finish()
        }


    }
}
