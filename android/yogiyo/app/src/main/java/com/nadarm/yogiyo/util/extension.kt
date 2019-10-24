package com.nadarm.yogiyo.util

import io.reactivex.Flowable
import io.reactivex.Scheduler
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.disposables.CompositeDisposable
import io.reactivex.rxkotlin.addTo

fun <T> Flowable<T>.subscribeMainThread(
    scheduler: Scheduler,
    compositeDisposable: CompositeDisposable,
    onNext: (T) -> Unit
) {
    this
        .subscribeOn(scheduler)
        .observeOn(AndroidSchedulers.mainThread())
        .subscribe(onNext)
        .addTo(compositeDisposable)
}