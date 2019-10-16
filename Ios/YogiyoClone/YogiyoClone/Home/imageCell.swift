//
//  imageCell.swift
//  YogiyoClone
//
//  Created by Jinyung Yoon on 24/09/2019.
//  Copyright © 2019 Jinyung Yoon. All rights reserved.
//

import UIKit

class imageCell: UICollectionViewCell {
     
    @IBOutlet weak var imageView: UIImageView!
    
    var image : UIImage? {
        didSet {
            self.imageView.image = image ?? UIImage(named: "")
        }
    }
}
