//
//  menupanCell.swift
//  YogiyoClone
//
//  Created by Jinyung Yoon on 24/09/2019.
//  Copyright © 2019 Jinyung Yoon. All rights reserved.
//

import UIKit

class menupanCell: UITableViewCell {

    @IBOutlet weak var menuCollectionView: UICollectionView! {
        didSet {
            self.menuCollectionView.delegate = self
            self.menuCollectionView.dataSource = self
        }
    }
    
    private let images = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14"]
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }

    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }

}

extension menupanCell : UICollectionViewDelegateFlowLayout, UICollectionViewDataSource {
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return images.count
    }
    
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAt indexPath: IndexPath) -> CGSize {
        let yourWidth = collectionView.frame.width/3.0
        let yourHeight = yourWidth

        return CGSize(width: yourWidth, height: yourHeight)
    }
    
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        guard let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "menuCell", for: indexPath) as? menuCell else { return UICollectionViewCell() }
//        print(cell.imageView.frame)
//        print(cell.imageView.image!.size.width)
//        print(cell.imageView.image!.size.height)
        
        var img = UIImage(named: images[indexPath.row])
        img = self.resizeImage(image: UIImage(named: images[indexPath.row])!, targetSize: CGSize(width: collectionView.frame.width/3, height: 120.0))
        cell.imageView.image = img
//
//        print(cell.imageView.frame)
//        print(cell.imageView.image!.size.width)
//        print(cell.imageView.image!.size.height)
//
        return cell
    }
    
    
    func resizeImage(image: UIImage, targetSize: CGSize) -> UIImage {
            let size = image.size

            let widthRatio  = targetSize.width  / size.width
            let heightRatio = targetSize.height / size.height
    //        print("targetsize", targetSize.width, targetSize.height)
    //        print("widthratio", widthRatio)
    //        print("heightratio", heightRatio)
    //        print(widthRatio * size.width)
            // Figure out what our orientation is, and use that to form the rectangle
            var newSize: CGSize
            newSize = CGSize(width: size.width * widthRatio, height: size.height * heightRatio)

    //        print(newSize.width, newSize.height)

            // This is the rect that we've calculated out and this is what is actually used below
            let rect = CGRect(x: 0, y: 0, width: newSize.width, height: newSize.height)

            // Actually do the resizing to the rect using the ImageContext stuff
            UIGraphicsBeginImageContextWithOptions(newSize, false, 1.0)
            image.draw(in: rect)
            let newImage = UIGraphicsGetImageFromCurrentImageContext()
            UIGraphicsEndImageContext()

            return newImage!
        }
//    
//    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAt indexPath: IndexPath) -> CGSize {
//        print(collectionView.frame.height)
//        return CGSize(width: collectionView.frame.width, height: collectionView.frame.height/2)
//    }

    
}

