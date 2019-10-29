//
//  MyPageVC.swift
//  YogiyoClone
//
//  Created by Jinyung Yoon on 2019/10/21.
//  Copyright © 2019 Jinyung Yoon. All rights reserved.
//

import UIKit

class MyPageVC: UIViewController, UIScrollViewDelegate {
    
    @IBOutlet weak var loginExplain: UILabel!
    @IBOutlet weak var loginbtn: UIButton!
    @IBOutlet weak var signUpbtn: UIButton!
    
    @IBOutlet weak var couponStore: UIButton!
    @IBOutlet weak var points: UIButton!
    @IBOutlet weak var reviewManage: UIButton!
    
    var coupons: String = "-"
    var point: String = "-"
    var reviews: String = "0건"
    
    override func viewDidLoad() {
        super.viewDidLoad()
<<<<<<< HEAD

        loginExplain.text = "로그인 하고 다양한 혜택을 받아보세요!"
        loginbtn.backgroundColor = .red

        signUpbtn.backgroundColor = .white
        signUpbtn.layer.borderColor = UIColor.black.cgColor
        signUpbtn.layer.borderWidth = 0.5
        
        couponStore.addTopBorderWithColor(color: .lightGray, width: 0.5)
        couponStore.addBottomBorderWithColor(color: .lightGray, width: 0.5)
        points.addTopBorderWithColor(color: .lightGray, width: 0.5)
        points.addBottomBorderWithColor(color: .lightGray, width: 0.5)
        points.addLeftBorderWithColor(color: .lightGray, width: 0.5)
        reviewManage.addLeftBorderWithColor(color: .lightGray, width: 0.5)
        reviewManage.addTopBorderWithColor(color: .lightGray, width: 0.5)
        reviewManage.addBottomBorderWithColor(color: .lightGray, width: 0.5)
        
        let text1 = NSMutableAttributedString(string: "쿠폰함\n\(coupons)")
        text1.addAttribute(NSAttributedString.Key.font, value: UIFont.boldSystemFont(ofSize: 15), range: NSMakeRange(0, text1.length))
        text1.addAttribute(NSAttributedString.Key.font, value: UIFont.systemFont(ofSize: 12), range: NSMakeRange(0, text1.length-coupons.count))
        let text2 = NSMutableAttributedString(string: "포인트\n\(point)")
        text2.addAttribute(NSAttributedString.Key.font, value: UIFont.boldSystemFont(ofSize: 15), range: NSMakeRange(0, text2.length))
        text2.addAttribute(NSAttributedString.Key.font, value: UIFont.systemFont(ofSize: 12), range: NSMakeRange(0, text2.length-point.count))
        let text3 = NSMutableAttributedString(string: "리뷰관리\n\(reviews)")
        text3.addAttribute(NSAttributedString.Key.font, value: UIFont.boldSystemFont(ofSize: 15), range: NSMakeRange(0, text3.length))
        text3.addAttribute(NSAttributedString.Key.font, value: UIFont.systemFont(ofSize: 12), range: NSMakeRange(0, text3.length-reviews.count))
        
        
        print(text1.length)
        
        couponStore.setAttributedTitle(text1, for: .normal)
        couponStore.titleLabel?.numberOfLines = 0
        couponStore.titleLabel?.textAlignment = .center
        couponStore.titleLabel?.textColor = .black
        
        points.setAttributedTitle(text2, for: .normal)
        points.titleLabel?.numberOfLines = 0
        points.titleLabel?.textColor = .black
        points.titleLabel?.textAlignment = .center
        
        reviewManage.setAttributedTitle(text3, for: .normal)
        reviewManage.titleLabel?.numberOfLines = 0
        reviewManage.titleLabel?.textColor = .black
        reviewManage.titleLabel?.textAlignment = .center
        
        
        signUpbtn.addTarget(self, action: #selector(gotopage), for: .touchUpInside)
=======
>>>>>>> e1140e14e8c77e64e6948e5525f06cb1367d6500
        
        // Do any additional setup after loading the view.
    }
    override func viewWillAppear(_ animated: Bool) {
        self.tabBarController?.tabBar.isHidden = false
    }
    
    @objc
    func gotopage() {
        let newVC = tabBarController?.storyboard?.instantiateViewController(withIdentifier: "SignUpVC")
        newVC!.modalPresentationStyle = .fullScreen
//        self.navigationController?.pushViewController(newVC!, animated: true)
//        self.tabBarController?.tabBar.isHidden = true

        self.present(newVC!, animated: true, completion: nil)

    }

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
    }
    */

}

extension UIView {
    func addTopBorderWithColor(color: UIColor, width: CGFloat) {
        let border = CALayer()
        border.backgroundColor = color.cgColor
        border.frame = CGRect(x:0,y: 0, width:self.frame.size.width, height:width)
        self.layer.addSublayer(border)
    }

    func addRightBorderWithColor(color: UIColor, width: CGFloat) {
        let border = CALayer()
        border.backgroundColor = color.cgColor
        border.frame = CGRect(x: self.frame.size.width - width,y: 0, width:width, height:self.frame.size.height)
        self.layer.addSublayer(border)
    }

    func addBottomBorderWithColor(color: UIColor, width: CGFloat) {
        let border = CALayer()
        border.backgroundColor = color.cgColor
        border.frame = CGRect(x:0, y:self.frame.size.height - width, width:self.frame.size.width, height:width)
        self.layer.addSublayer(border)
    }

    func addLeftBorderWithColor(color: UIColor, width: CGFloat) {
        let border = CALayer()
        border.backgroundColor = color.cgColor
        border.frame = CGRect(x:0, y:0, width:width, height:self.frame.size.height)
        self.layer.addSublayer(border)
    }

    func addMiddleBorderWithColor(color: UIColor, width: CGFloat) {
        let border = CALayer()
        border.backgroundColor = color.cgColor
        border.frame = CGRect(x:self.frame.size.width/2, y:0, width:width, height:self.frame.size.height)
        self.layer.addSublayer(border)
    }
}
