//
//  NewSource.swift
//  YogiyoClone
//
//  Created by Jinyung Yoon on 2019/10/23.
//  Copyright © 2019 Jinyung Yoon. All rights reserved.
//

import Foundation

enum NewsSource: String {

  case associatedPress = "associated-press"
  case bbcNews = "bbc-news"
  case buzzfeed = "buzzfeed"
  case cnbc = "cnbc"
  case cnn = "cnn"
  case googleNews = "google-news"
  case reuters = "reuters"

  var title: String {
    switch self {
    case .associatedPress: return "전체"
    case .bbcNews: return "한식"
    case .buzzfeed: return "야식"
    case .cnbc: return "치킨"
    case .cnn: return "중식"
    case .googleNews: return "디저트/카페"
    case .reuters: return "일식/돈까스"
    }
  }

  static var allValues: [NewsSource] {
    return [
      .associatedPress,
      .bbcNews,
      .buzzfeed,
      .cnbc,
      .cnn,
      .googleNews,
      .reuters
    ]
  }
}
