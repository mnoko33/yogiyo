package com.nadarm.yogiyo.di

import javax.inject.Qualifier
import javax.inject.Scope

@Scope
@Retention(AnnotationRetention.RUNTIME)
annotation class ActivityScope

@Scope
@Retention(AnnotationRetention.RUNTIME)
annotation class FragmentScope

@Qualifier
@Retention(AnnotationRetention.RUNTIME)
annotation class Named(val value:String)