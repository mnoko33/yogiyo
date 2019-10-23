//
//  RestaurantCell.swift
//  YogiyoClone
//
//  Created by Jinyung Yoon on 2019/10/23.
//  Copyright © 2019 Jinyung Yoon. All rights reserved.
//

import UIKit
import SDWebImage
import MaterialComponents

class RestaurantCell: UICollectionViewCell {
    static let cellID = "RestaurantCellID"
    static let cellHeight: CGFloat = 70
    static let cellPadding: CGFloat = 8.0
    var inkTouchController: MDCInkTouchController?

    
    @IBOutlet weak var imageView: UIImageView!
    @IBOutlet weak var titleLabel: UILabel!
    @IBOutlet weak var subtitleLabel: UILabel!
    @IBOutlet weak var orderTime: UILabel!
    
    
    var article: Article? {
      didSet {
        guard let article = article else {
          return
        }

        imageView.sd_setImage(with: article.imageURL)
        titleLabel.text = article.title
        subtitleLabel.text = article.description
        if let date = article.publishedAt {
          orderTime.isHidden = false
          orderTime.text = date
        } else {
          orderTime.isHidden = true
        }
      }
    }

    override func awakeFromNib() {
      super.awakeFromNib()

        shadowLayer?.elevation = ShadowElevation.cardResting

      inkTouchController = MDCInkTouchController(view: self)
      inkTouchController?.addInkView()

      layer.shouldRasterize = true
      layer.rasterizationScale = UIScreen.main.scale

      clipsToBounds = false
      imageView.clipsToBounds = true

      titleLabel.font = MDCTypography.headlineFont()
      titleLabel.alpha = MDCTypography.headlineFontOpacity()
      orderTime.font = MDCTypography.captionFont()
      orderTime.alpha = MDCTypography.captionFontOpacity()
      subtitleLabel.font = MDCTypography.body2Font()
      subtitleLabel.alpha = MDCTypography.body2FontOpacity()
    }

    override func prepareForReuse() {
      super.prepareForReuse()
      imageView.sd_cancelCurrentImageLoad()
      titleLabel.text = nil
      subtitleLabel.text = nil
      orderTime.text = nil
    }

    override class var layerClass: AnyClass {
      return MDCShadowLayer.self
    }

    var shadowLayer: MDCShadowLayer? {
      return self.layer as? MDCShadowLayer
    }
}
