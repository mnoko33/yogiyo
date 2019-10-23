//
//  Appearance.swift
//  YogiyoClone
//
//  Created by Jinyung Yoon on 2019/10/23.
//  Copyright © 2019 Jinyung Yoon. All rights reserved.
//

import UIKit
import MaterialComponents

class Appearance {

  static func configure() {
    MDCTypography.setFontLoader(AvenirTypeface())
  }

  static var palette: MDCPalette {
    return MDCPalette.teal
  }

}

class AvenirTypeface: NSObject, MDCTypographyFontLoading {

    func lightFont(ofSize fontSize: CGFloat) -> UIFont? {
    return UIFont(name: "AvenirNext-Light", size: fontSize)!
  }

  func regularFont(ofSize fontSize: CGFloat) -> UIFont {
    return UIFont(name: "AvenirNext-Regular", size: fontSize)!
  }

    func mediumFont(ofSize fontSize: CGFloat) -> UIFont? {
    return UIFont(name: "AvenirNext-Medium", size: fontSize)!
  }

  func boldFont(ofSize fontSize: CGFloat) -> UIFont {
    return UIFont(name: "AvenirNext-Bold", size: fontSize)!
  }

  func italicFont(ofSize fontSize: CGFloat) -> UIFont {
    return UIFont(name: "AvenirNext-Italic", size: fontSize)!
  }

    func boldItalicFont(ofSize fontSize: CGFloat) -> UIFont? {
    return UIFont(name: "AvenirNext-BoldItalic", size: fontSize)!
  }

}
