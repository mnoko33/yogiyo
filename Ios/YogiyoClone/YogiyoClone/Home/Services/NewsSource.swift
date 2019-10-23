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
    case .associatedPress: return "Associated Press"
    case .bbcNews: return "BBC News"
    case .buzzfeed: return "Buzzfeed"
    case .cnbc: return "CNBC"
    case .cnn: return "CNN"
    case .googleNews: return "Google News"
    case .reuters: return "Reuters"
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
