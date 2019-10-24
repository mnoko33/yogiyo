//
//  companyInfoCell.swift
//  YogiyoClone
//
//  Created by Jinyung Yoon on 2019/10/22.
//  Copyright © 2019 Jinyung Yoon. All rights reserved.
//

import UIKit

class companyInfoCell: UITableViewCell {
    
    var companyTitleButton: UILabel = {
        let cTB = UILabel()
        cTB.text = "(유)딜리버리히어로 코리아 사업자정보"
        cTB.textColor = .black
        cTB.font = UIFont.systemFont(ofSize: 13, weight: UIFont.Weight.regular)
        cTB.translatesAutoresizingMaskIntoConstraints = false
        
        return cTB
    }()
    
    var userTerms: UILabel = {
        let cTB = UILabel()
        cTB.text = "이용약관 | "
        cTB.textColor = .black
        cTB.font = UIFont.systemFont(ofSize: 11, weight: UIFont.Weight.regular)
        cTB.translatesAutoresizingMaskIntoConstraints = false
        
        return cTB
    }()
    
    var personalDataTerms: UILabel = {
        let cTB = UILabel()
        cTB.text = "개인정보처리방침 | "
        cTB.textColor = .black
        cTB.font = UIFont.systemFont(ofSize: 11, weight: UIFont.Weight.regular)
        cTB.translatesAutoresizingMaskIntoConstraints = false
        
        return cTB
    }()
    
    var userLevel: UILabel = {
        let cTB = UILabel()
        cTB.text = "회원등급정책 | "
        cTB.textColor = .black
        cTB.font = UIFont.systemFont(ofSize: 11, weight: UIFont.Weight.regular)
        cTB.translatesAutoresizingMaskIntoConstraints = false
        
        return cTB
    }()
    
    var companyInfoCheck: UILabel = {
        let cTB = UILabel()
        cTB.text = "사업자정보확인"
        cTB.textColor = .black
        cTB.font = UIFont.systemFont(ofSize: 11, weight: UIFont.Weight.regular)
        cTB.translatesAutoresizingMaskIntoConstraints = false
        
        return cTB
    }()
    
    var alertInfo: UILabel = {
        let aI = UILabel()
        aI.numberOfLines = 0
        aI.text = "(유) 딜리버리히어로 코리아는 통신판매중개자로서, 상품/거패정보 및 거래와 관련하여 \n통신판매 당사자의 고의 또는 과실로 소비자에게 발생하는 손해에 대해 책임을 지지 \n않습니다. 상품 및 거래에 대한 정확한 정보는 해당 판매자에게 직접 확인하기 바랍니다. \n Copyright YOGIYO. All Rights Reserved."
        aI.textColor = .darkGray
        aI.font = UIFont.systemFont(ofSize: 9, weight: UIFont.Weight.thin)
        aI.translatesAutoresizingMaskIntoConstraints = false
        aI.textAlignment = .center
        aI.lineBreakMode = .byWordWrapping
        
        return aI
    }()
//    var secondLine: UILabel = {
//        let sL = UILabel()
//        sL.textColor = .black
//        sL.font = UIFont.systemFont(ofSize: 8, weight: UIFont.Weight.regular)
//        sL.translatesAutoresizingMaskIntoConstraints = false
//        return sL
//    }()
    
    @IBOutlet weak var companyInfoView: UIView! {
        didSet {
            self.addSubview(companyTitleButton)
            companyTitleButton.textAlignment = .center
            
            companyTitleButton.topAnchor.constraint(equalTo: self.companyInfoView.topAnchor, constant: 30).isActive = true
            companyTitleButton.centerXAnchor.constraint(equalTo: self.companyInfoView.leadingAnchor, constant: self.companyInfoView.center.x).isActive = true
            
//            companyTitleButton.leadingAnchor.constraint(equalTo: self.companyInfoView.leadingAnchor).isActive = true
//            companyTitleButton.trailingAnchor.constraint(equalTo: self.companyInfoView.trailingAnchor).isActive = true
            self.companyInfoView.backgroundColor = UIColor(red: 222/255, green: 229/255, blue: 222/255, alpha: 1.0) /* #dee5de */
            
//            self.addSubview(secondLine)
            self.addSubview(userTerms)
            self.addSubview(personalDataTerms)
            self.addSubview(userLevel)
            self.addSubview(companyInfoCheck)
//            secondLine.text = "\(userTerms.text!) | \(personalDataTerms.text!) | \(userLevel.text!) | \(companyInfoCheck.text!)"
//            secondLine.textAlignment = .center
            userTerms.topAnchor.constraint(equalTo: self.companyTitleButton.bottomAnchor, constant: 15).isActive = true
            userTerms.leadingAnchor.constraint(equalTo: self.companyTitleButton.leadingAnchor, constant: -35).isActive = true
            personalDataTerms.topAnchor.constraint(equalTo: self.companyTitleButton.bottomAnchor, constant: 15).isActive = true
            personalDataTerms.leadingAnchor.constraint(equalTo: self.userTerms.trailingAnchor).isActive = true
            userLevel.topAnchor.constraint(equalTo: self.companyTitleButton.bottomAnchor, constant: 15).isActive = true
            userLevel.leadingAnchor.constraint(equalTo: self.personalDataTerms.trailingAnchor).isActive = true
            companyInfoCheck.topAnchor.constraint(equalTo: self.companyTitleButton.bottomAnchor, constant: 15).isActive = true
            companyInfoCheck.leadingAnchor.constraint(equalTo: self.userLevel.trailingAnchor).isActive = true
            
            
            
            
            let tap1 = UITapGestureRecognizer(target: self, action: #selector(tapFunction1))
            companyTitleButton.isUserInteractionEnabled = true
            companyTitleButton.addGestureRecognizer(tap1)
            
            let tap2 = UITapGestureRecognizer(target: self, action: #selector(tapFunction2))
            userTerms.isUserInteractionEnabled = true
            userTerms.addGestureRecognizer(tap2)
            
            let tap3 = UITapGestureRecognizer(target: self, action: #selector(tapFunction3))
            personalDataTerms.isUserInteractionEnabled = true
            personalDataTerms.addGestureRecognizer(tap3)
            
            let tap4 = UITapGestureRecognizer(target: self, action: #selector(tapFunction4))
            userLevel.isUserInteractionEnabled = true
            userLevel.addGestureRecognizer(tap4)
            
            let tap5 = UITapGestureRecognizer(target: self, action: #selector(tapFunction5))
            companyInfoCheck.isUserInteractionEnabled = true
            companyInfoCheck.addGestureRecognizer(tap5)
            
            
            
            self.addSubview(alertInfo)
     
            alertInfo.topAnchor.constraint(equalTo: self.userLevel.bottomAnchor, constant: 15).isActive = true
            alertInfo.centerXAnchor.constraint(equalTo: self.companyInfoView.leadingAnchor, constant: self.companyInfoView.frame.width/2).isActive = true
            alertInfo.bottomAnchor.constraint(equalTo: self.companyInfoView.bottomAnchor, constant: 20).isActive = true
            

        }
    }
    
    @objc
    func tapFunction1(sender:UITapGestureRecognizer) {
        print("tap working")
    }
    
    @objc
    func tapFunction2(sender:UITapGestureRecognizer) {
        print("이용약관")
    }
    @objc
    func tapFunction3(sender:UITapGestureRecognizer) {
        print("개인정보처리정책")
    }
    @objc
    func tapFunction4(sender:UITapGestureRecognizer) {
        print("유저등급")
    }
    @objc
    func tapFunction5(sender:UITapGestureRecognizer) {
        print("회사정보")
    }

    
    
    
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }

    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }

}
