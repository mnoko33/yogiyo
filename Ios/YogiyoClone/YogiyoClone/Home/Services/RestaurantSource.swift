//
//  NewSource.swift
//  YogiyoClone
//
//  Created by Jinyung Yoon on 2019/10/23.
//  Copyright © 2019 Jinyung Yoon. All rights reserved.
//

import Foundation

enum RestaurantSource: String {

//    case total = "total"
//    case oneServeMeal = "oneServeMeal"
//    case chicken = "chicken"
//    case chinese = "chinese"
//    case pizza = "pizza"
//    case korean = "korean"
//    case bunsik = "bunsik"
//    case dessert = "dessert"
//    case jokbal = "jokbal"
//    case japanese = "japanese"
//    case lateNightFood = "lateNightFood"
//    case franchise = "franchise"
    
    case total = "associated-press"
    case oneServeMeal = "bbc-news"
    case chicken = "buzzfeed"
    case chinese = "cnbc"
    case pizza = "cnn"
    case korean = "google-news"
    case bunsik = "reuters"

    var title: String {
        switch self {
            case .total: return "전체"
            case .oneServeMeal: return "1인분 주문"
            case .chicken: return "치킨"
            case .chinese: return "중식"
            case .pizza: return "피자/양식"
            case .korean: return "한식"
            case .bunsik: return "분식"
//            case .dessert: return "디저트/카페"
//            case .jokbal: return "족발/보쌈"
//            case .japanese: return "일식/돈까스"
//            case .lateNightFood: return "야식"
//            case .franchise: return "프랜차이즈"
        }
    }

    static var allValues: [RestaurantSource] {
        return [
            .total,
            .oneServeMeal,
            .chicken,
            .chinese,
            .pizza,
            .korean,
            .bunsik,
//            .dessert,
//            .jokbal,
//            .japanese,
//            .lateNightFood,
//            .franchise
        ]
    }
}
