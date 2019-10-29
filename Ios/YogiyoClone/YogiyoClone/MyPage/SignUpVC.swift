//
//  SignUpVC.swift
//  YogiyoClone
//
//  Created by Jinyung Yoon on 2019/10/28.
//  Copyright © 2019 Jinyung Yoon. All rights reserved.
//

import UIKit

class SignUpVC: UIViewController {
    
    @IBOutlet weak var backBtn: UIButton!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        backBtn.addTarget(self, action: #selector(backView), for: .touchUpInside)
        self.view.backgroundColor = .white
        // Do any additional setup after loading the view.
    }
    
    
    @objc
    func backView() {
        dismiss(animated: true, completion: nil)
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
