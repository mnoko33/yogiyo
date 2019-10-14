package com.nadarm.yogiyo.di

import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import com.nadarm.yogiyo.ui.viewModel.AutoScrollAdViewModel
import com.nadarm.yogiyo.ui.viewModel.FoodCategoryViewModel
import com.nadarm.yogiyo.ui.viewModel.RestaurantViewModel
import dagger.Binds
import dagger.MapKey
import dagger.Module
import dagger.multibindings.IntoMap
import javax.inject.Inject
import javax.inject.Provider
import javax.inject.Singleton
import kotlin.reflect.KClass

@Singleton
class ViewModelFactory @Inject constructor(
    private val viewModels: MutableMap<Class<out ViewModel>, Provider<ViewModel>>
) : ViewModelProvider.Factory {
    override fun <T : ViewModel> create(modelClass: Class<T>): T {
        return viewModels[modelClass]?.get() as T
    }
}

@Target(
    AnnotationTarget.FUNCTION,
    AnnotationTarget.PROPERTY_SETTER,
    AnnotationTarget.PROPERTY_GETTER
)
@kotlin.annotation.Retention(AnnotationRetention.RUNTIME)
@MapKey
internal annotation class ViewModelKey(val value: KClass<out ViewModel>)

@Module
abstract class ViewModelModule {

    @Binds
    @IntoMap
    @ViewModelKey(AutoScrollAdViewModel.ViewModelImpl::class)
    internal abstract fun bindAutoScrollAdViewModel(viewModel: AutoScrollAdViewModel.ViewModelImpl): ViewModel

    @Binds
    @IntoMap
    @ViewModelKey(FoodCategoryViewModel.ViewModelImpl::class)
    internal abstract fun bindFoodCategoryViewModel(viewModel: FoodCategoryViewModel.ViewModelImpl): ViewModel

    @Binds
    @IntoMap
    @ViewModelKey(RestaurantViewModel.ViewModelImpl::class)
    internal abstract fun bindRestaurantViewModel(viewModel: RestaurantViewModel.ViewModelImpl): ViewModel
}