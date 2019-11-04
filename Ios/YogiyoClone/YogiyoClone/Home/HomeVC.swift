//
//  ViewController.swift
//  YogiyoClone
//
//  Created by Jinyung Yoon on 24/09/2019.
//  Copyright © 2019 Jinyung Yoon. All rights reserved.
//

import UIKit


class HomeVC: UIViewController {
//    var menu = menupanCell()
//    var sendClickedMenu: RestaurantList?
//    let appDelegate = UIApplication.shared.delegate as! AppDelegate

    @IBOutlet weak var tableView: UITableView!{
        didSet {
            self.tableView.delegate = self
            self.tableView.dataSource = self 
        }
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
//        menu.sendData = self
        let image = UIImage(named: "yogiyo")
        self.navigationItem.titleView = UIImageView(image: image)
        self.navigationItem.titleView?.contentMode = .scaleAspectFit
        self.tableView.backgroundColor = UIColor(red: 222/255, green: 229/255, blue: 222/255, alpha: 1.0) /* #dee5de */
        
    }
    
    
//    func getRestNumber(i: Int) {
//        appDelegate.selectedMenu = i
//        print(appDelegate.selectedMenu)
//    }

}

extension HomeVC : UITableViewDelegate, UITableViewDataSource {
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return 4
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        
//        if indexPath.row == 0 {
////            var cell: UITableViewCell?
//            let cell = tableView.dequeueReusableCell(withIdentifier: "imageSlideCell", for: indexPath) as? imageSlideCell
//            return cell!
//        } else if indexPath.row == 1 {
//            var cell: UITableViewCell?
//            cell = tableView.dequeueReusableCell(withIdentifier: "emptyCell", for: indexPath)
//            cell?.backgroundColor = UIColor(red: 222/255, green: 229/255, blue: 222/255, alpha: 1.0) /* #dee5de */
//            return cell!
//
//        } else if indexPath.row == 2 {
//
//            let cell = tableView.dequeueReusableCell(withIdentifier: "menupanCell", for: indexPath) as? menupanCell
//            cell?.sendData = self
//
//            return cell!
//
//        } else {
//            let cell = tableView.dequeueReusableCell(withIdentifier: "companyInfoCell", for: indexPath) as? companyInfoCell
//            return cell!
//
//        }
        var cell: UITableViewCell?
        
        if indexPath.row == 0 {
            cell = tableView.dequeueReusableCell(withIdentifier: "imageSlideCell", for: indexPath) as? imageSlideCell
        } else if indexPath.row == 1 {
            cell = tableView.dequeueReusableCell(withIdentifier: "emptyCell", for: indexPath)
            cell?.backgroundColor = UIColor(red: 222/255, green: 229/255, blue: 222/255, alpha: 1.0) /* #dee5de */

        } else if indexPath.row == 2 {
            
            cell = tableView.dequeueReusableCell(withIdentifier: "menupanCell", for: indexPath) as? menupanCell
            
        } else {
            cell = tableView.dequeueReusableCell(withIdentifier: "companyInfoCell", for: indexPath) as? companyInfoCell
        }
        
        return cell!
    }
    
    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        var a: CGFloat
        if indexPath.row == 0 {
            a = 120
        } else if indexPath.row == 1 {
            a = 8
        } else if indexPath.row == 2 {
            let b: Images = Images()
            a = CGFloat(120 * (Int(b.callCountmenupanImage() / 3) + 1))
        } else {
            a = 150
        }
        return CGFloat(a)
    }
    
}
