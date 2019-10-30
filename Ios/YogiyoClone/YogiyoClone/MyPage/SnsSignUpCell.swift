//
//  SnsSignUpCell.swift
//  YogiyoClone
//
//  Created by Jinyung Yoon on 2019/10/29.
//  Copyright © 2019 Jinyung Yoon. All rights reserved.
//

import UIKit

class SnsSignUpCell: UITableViewCell {

    @IBOutlet weak var signUpTitle: UILabel!
    @IBOutlet weak var naverBtn: UIButton!
    @IBOutlet weak var kakaoBtn: UIButton!
    
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }
    
//    override init(style: UITableViewCell.CellStyle, reuseIdentifier: String?) {
//        super.init(style: style, reuseIdentifier: "SnsSignUpCell")
//    }

    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }

}
