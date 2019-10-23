//
//  ImageData.swift
//  YogiyoClone
//
//  Created by Jinyung Yoon on 2019/10/22.
//  Copyright © 2019 Jinyung Yoon. All rights reserved.
//

import Foundation


class Images {
    private let menupanImages = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14"]
    
    private let adImages = ["ad1", "ad2", "ad3", "ad4", "ad5", "ad6", "ad1"]
    
    func callmenupanImages () -> [String] {
        return menupanImages
    }
    
    
    func callCountmenupanImage() -> Int {
        return menupanImages.count
    }
    
    func callAdImages () -> [String] {
        return adImages
    }
    
    
    func callCountAdImage() -> Int {
        return adImages.count
    }
    
    init() {
        
    }
}
