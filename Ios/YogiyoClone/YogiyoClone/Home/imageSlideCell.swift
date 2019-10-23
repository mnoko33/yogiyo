//
//  imageSlideCell.swift
//  YogiyoClone
//
//  Created by Jinyung Yoon on 24/09/2019.
//  Copyright © 2019 Jinyung Yoon. All rights reserved.
//

import UIKit

class imageSlideCell: UITableViewCell {
    var timer: Timer?
    var pageControl = UIPageControl()
    @IBOutlet weak var imageCollectionView: UICollectionView!{
        didSet {
            self.imageCollectionView.delegate = self
            self.imageCollectionView.dataSource = self
            images = imagedata.callAdImages()
            pageControl.numberOfPages = images.count
            startTimer(time: 1.5)
        }
    }
    
    private let imagedata: Images = Images()

    var images: [String] = []
    
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
//        pageControl.numberOfPages = images.count
    }

    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }
    
    func scrollViewWillEndDragging(_ scrollView: UIScrollView, withVelocity velocity: CGPoint, targetContentOffset: UnsafeMutablePointer<CGPoint>) {
        let pageNumber = Int(targetContentOffset.pointee.x / imageCollectionView.frame.width)
//        print(pageNumber)
//        print(targetContentOffset.pointee.x)
        pageControl.currentPage = pageNumber
    }

    
    @objc
    func scrollToNextCell() {
        let page = pageControl.currentPage
        if page == images.count - 1 {
            DispatchQueue.global().sync {
                imageCollectionView.scrollToItem(at: IndexPath(row: 0, section: 0), at: UICollectionView.ScrollPosition.left, animated: false)
            }
            pageControl.currentPage = 0

        } else {
            imageCollectionView.scrollToItem(at: IndexPath(row: page + 1, section: 0), at: UICollectionView.ScrollPosition.right, animated: true)

            pageControl.currentPage += 1
        }

    }

    /**
     call this method when collection view loaded
     */
    func startTimer(time: CGFloat) {
        if timer == nil {
            timer = Timer.scheduledTimer(timeInterval: TimeInterval(time), target: self, selector: #selector(scrollToNextCell), userInfo: nil, repeats: true);
        }
    }


}


extension imageSlideCell : UICollectionViewDelegateFlowLayout, UICollectionViewDataSource, UICollectionViewDelegate {
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
//        print(images.count)
        return images.count
    }
    
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "imageCell", for: indexPath) as? imageCell
        
        
//        let x = collectionView.frame.width
//        let y = collectionView.frame.height
//        cell?.frame.size = x
//        cell?.frame.height = y
        var img = UIImage(named: images[indexPath.row])
//        print("collectionview", x, y)
//        print("imagecell", cell?.frame.width, cell?.frame.height)
        img = self.resizeImage(image: UIImage(named: images[indexPath.row])!, targetSize: CGSize(width: collectionView.frame.width, height: collectionView.frame.height))
//        print("img", img?.size.width)
        cell?.imageView.image = img
//        let x = Int(collectionView.frame.width)
//        let y = collectionView.frame.height
//        print(x, y)
//
//        cell?.frame = CGRect(x: CGFloat(x * indexPath.row), y: 0.0, width:
//            CGFloat(x), height: y)
//        print(cell?.frame.width, cell?.frame.height)
        
        return cell!
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
    
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAt indexPath: IndexPath) -> CGSize {
        
//        print("dudududu", collectionView.frame.width)
        return CGSize(width: collectionView.frame.width, height: collectionView.frame.height)
    }

    
}
