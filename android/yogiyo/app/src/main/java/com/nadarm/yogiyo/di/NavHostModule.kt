package com.nadarm.yogiyo.di

import androidx.fragment.app.Fragment
import androidx.fragment.app.FragmentFactory
import com.nadarm.yogiyo.ui.fragment.FoodHomeFragment
import com.nadarm.yogiyo.ui.fragment.FoodTabFragment
import com.nadarm.yogiyo.ui.fragment.InjectingNavHostFragment
import com.nadarm.yogiyo.ui.fragment.MainFoodFragment
import dagger.Binds
import dagger.MapKey
import dagger.Module
import dagger.android.ContributesAndroidInjector
import dagger.multibindings.IntoMap
import javax.inject.Inject
import javax.inject.Provider
import kotlin.reflect.KClass

@Module
abstract class NavHostModule {

    @ContributesAndroidInjector(modules = [FragmentBindingModule::class])
    abstract fun navHostFragmentInjector(): InjectingNavHostFragment
}


@Module
abstract class FragmentBindingModule {

    @Binds
    @IntoMap
    @FragmentKey(MainFoodFragment::class)
    abstract fun bindMainFoodFragment(fragment: MainFoodFragment): Fragment

    @Binds
    @IntoMap
    @FragmentKey(FoodHomeFragment::class)
    abstract fun bindFoodHomeFragment(fragment: FoodHomeFragment): Fragment

    @Binds
    @IntoMap
    @FragmentKey(FoodTabFragment::class)
    abstract fun bindFoodTabFragment(fragment: FoodTabFragment): Fragment

}

@Target(
    AnnotationTarget.FUNCTION,
    AnnotationTarget.PROPERTY_GETTER,
    AnnotationTarget.PROPERTY_SETTER
)
@Retention(AnnotationRetention.RUNTIME)
@MapKey
internal annotation class FragmentKey(val value: KClass<out Fragment>)


class InjectingFragmentFactory @Inject constructor(
    private val creators: Map<Class<out Fragment>, @JvmSuppressWildcards Provider<Fragment>>
) : FragmentFactory() {

    override fun instantiate(classLoader: ClassLoader, className: String): Fragment {
        val fragmentClass = loadFragmentClass(classLoader, className)
        val creator =
            creators[fragmentClass] ?: return createFragmentAsFallback(classLoader, className)

        try {
            return creator.get()
        } catch (e: Exception) {
            throw RuntimeException(e)
        }
    }

    private fun createFragmentAsFallback(classLoader: ClassLoader, className: String): Fragment {
        return super.instantiate(classLoader, className)
    }
}