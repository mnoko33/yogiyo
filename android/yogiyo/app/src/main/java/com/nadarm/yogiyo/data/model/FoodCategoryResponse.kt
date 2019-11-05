package com.nadarm.yogiyo.data.model

data class GetFoodCategoriesResponse(
    val status: String,
    val categories: List<Category>
)

data class Category(
    val id: Long,
    val name: String,
    val imgUrl: String
)