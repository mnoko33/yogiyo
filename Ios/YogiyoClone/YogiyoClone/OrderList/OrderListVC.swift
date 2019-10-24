//
//  OrderListVC.swift
//  YogiyoClone
//
//  Created by Jinyung Yoon on 2019/10/21.
//  Copyright © 2019 Jinyung Yoon. All rights reserved.
//

import UIKit

class OrderListVC: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
    }
    
    func didSelectRowAt(indexPath: Int) {
        print("선택된 행은 \(indexPath)")
        navigationController?.present(self, animated: true)
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
