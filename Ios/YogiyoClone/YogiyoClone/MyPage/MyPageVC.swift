//
//  MyPageVC.swift
//  YogiyoClone
//
//  Created by Jinyung Yoon on 2019/10/21.
//  Copyright © 2019 Jinyung Yoon. All rights reserved.
//

import UIKit

class MyPageVC: UIViewController {
    
    @IBOutlet weak var loginTitle: UILabel!
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setUpLogin()
        // Do any additional setup after loading the view.
    }
    
    func setUpLogin() {
        loginTitle.text = "로그인하고 다양한 혜택을 받아보세요!"
        loginTitle.translatesAutoresizingMaskIntoConstraints = true
        loginTitle.tintColor = .black
        loginTitle.textAlignment = .center
        
        
        
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
