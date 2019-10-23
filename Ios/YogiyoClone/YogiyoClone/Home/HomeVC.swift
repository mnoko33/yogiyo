//
//  ViewController.swift
//  YogiyoClone
//
//  Created by Jinyung Yoon on 24/09/2019.
//  Copyright © 2019 Jinyung Yoon. All rights reserved.
//

import UIKit

class HomeVC: UIViewController { 

    @IBOutlet weak var tableView: UITableView!{
        didSet {
            self.tableView.delegate = self
            self.tableView.dataSource = self
        }
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        let image = UIImage(named: "yogiyo")
        self.navigationItem.titleView = UIImageView(image: image)
        self.navigationItem.titleView?.contentMode = .scaleAspectFit
    }
    
}

extension HomeVC : UITableViewDelegate, UITableViewDataSource {
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return 2
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        
        var cell: UITableViewCell?
        
        if indexPath.row == 0 {
            cell = tableView.dequeueReusableCell(withIdentifier: "imageSlideCell", for: indexPath) as? imageSlideCell
            
        } else if indexPath.row == 1 {
            cell = tableView.dequeueReusableCell(withIdentifier: "menupanCell", for: indexPath) as? menupanCell
        }
        print("tablecell", tableView.frame.width)
        print("tablecell", cell?.frame.width)
        
        return cell!
    }
    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        var a = 0
        if indexPath.row == 0 {
            a = 100
        } else {
            a = 120 * 5
        }
        return CGFloat(a)
    }
    
}
