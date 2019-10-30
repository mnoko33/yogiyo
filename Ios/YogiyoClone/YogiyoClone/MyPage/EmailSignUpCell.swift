//
//  EmailSignUpCell.swift
//  YogiyoClone
//
//  Created by Jinyung Yoon on 2019/10/29.
//  Copyright © 2019 Jinyung Yoon. All rights reserved.
//

import UIKit

class EmailSignUpCell: UITableViewCell {

    @IBOutlet weak var emailSignUpTitle: UILabel!
    @IBOutlet weak var email: UITextField!
    @IBOutlet weak var password: UITextField!
    @IBOutlet weak var passwordRe: UITextField!
    @IBOutlet weak var nickname: UITextField!
    
    
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }

    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }

}
