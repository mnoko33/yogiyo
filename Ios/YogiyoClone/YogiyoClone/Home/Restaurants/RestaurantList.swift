//
//  RestaurantList.swift
//  YogiyoClone
//
//  Created by Jinyung Yoon on 2019/10/23.
//  Copyright © 2019 Jinyung Yoon. All rights reserved.
//

import UIKit
import MaterialComponents
import SafariServices
let appDelegate = UIApplication.shared.delegate as! AppDelegate

class RestaurantList: UICollectionViewController {
    
    let appBar = MDCAppBarViewController()
    let heroHeaderView = HeroHeaderView()
    let tabBar = MDCTabBar()

    let apiClient = RestaurantClient()
    var restaurants: [Restaurant] = []
    var inProgressTask: Cancellable?

    override func viewDidLoad() {
      super.viewDidLoad()
      configureAppBar()
      configureCollectionView()
      refreshContent()
    }

    override var preferredStatusBarStyle: UIStatusBarStyle {
      return .lightContent
    }
}
    

// MARK: UI Configuration
extension RestaurantList {

    func configureAppBar() {
        self.addChild(appBar)

//    appBar.navigationBar.backgroundColor = .clear
//    appBar.layoutDelegate = self
//    appBar.navigationBar.tintColor = .white
//    appBar.navigationBar.title = nil
//
        let headerView = appBar.headerView
//    headerView.backgroundColor = .clear
//    headerView.maximumHeight = HeroHeaderView.Constants.maxHeight
        headerView.minimumHeight = HeroHeaderView.Constants.minHeight

//    headerView.insertSubview(heroHeaderView, at: 0)
        tabBar.itemAppearance = .titles
        tabBar.items = RestaurantSource.allValues.enumerated().map({ (index, source) -> UITabBarItem in
            let a = UITabBarItem()
            a.title = source.title
            a.image = nil
            a.tag = index
            a.setTitleTextAttributes([NSAttributedString.Key(rawValue: NSAttributedString.Key.foregroundColor.rawValue): UIColor.black], for: .disabled)
            a.setTitleTextAttributes([NSAttributedString.Key(rawValue: NSAttributedString.Key.foregroundColor.rawValue): UIColor.gray], for: .selected)
            return a
        })
        tabBar.selectedItem = tabBar.items[appDelegate.selectedMenu!]
        tabBar.tintColor = .gray
        tabBar.inkColor = Appearance.palette.tint200.withAlphaComponent(0.2)
        tabBar.delegate = self
    
//    view.addSubview(tabBar)
        headerView.trackingScrollView = self.collectionView
        appBar.headerStackView.bottomBar = tabBar
        appBar.headerStackView.backgroundColor = .lightGray

        view.addSubview(appBar.view)
        appBar.didMove(toParent: self)
  }

    func configureCollectionView() {
        let cellNib = UINib(nibName: "RestaurantCell", bundle: nil)
        collectionView?.register(cellNib, forCellWithReuseIdentifier: RestaurantCell.cellID)
        collectionView?.backgroundColor = UIColor(white: 0.9, alpha: 1.0)
    }

  // MARK: UIScrollViewDelegate

//  override func scrollViewDidScroll(_ scrollView: UIScrollView) {
//    let headerView = appBar.headerView
//    if scrollView == headerView.trackingScrollView {
//      headerView.trackingScrollDidScroll()
//    }
//  }
//
//  override func scrollViewDidEndDecelerating(_ scrollView: UIScrollView) {
//    let headerView = appBar.headerView
//    if scrollView == headerView.trackingScrollView {
//      headerView.trackingScrollDidEndDecelerating()
//    }
//  }
//
//  override func scrollViewDidEndDragging(_ scrollView: UIScrollView, willDecelerate decelerate: Bool) {
//    let headerView = appBar.headerView
//    if scrollView == headerView.trackingScrollView {
//      headerView.trackingScrollDidEndDraggingWillDecelerate(decelerate)
//    }
//  }
//
//  override func scrollViewWillEndDragging(_ scrollView: UIScrollView, withVelocity velocity: CGPoint, targetContentOffset: UnsafeMutablePointer<CGPoint>) {
//    let headerView = appBar.headerView
//    if scrollView == headerView.trackingScrollView {
//      headerView.trackingScrollWillEndDragging(withVelocity: velocity, targetContentOffset: targetContentOffset)
//    }
//  }


}

// MARK: MDCFlexibleHeaderViewLayoutDelegateD
extension RestaurantList: MDCFlexibleHeaderViewLayoutDelegate {

    public func flexibleHeaderViewController(_ flexibleHeaderViewController: MDCFlexibleHeaderViewController, flexibleHeaderViewFrameDidChange flexibleHeaderView: MDCFlexibleHeaderView) {
        heroHeaderView.update(withScrollPhasePercentage: flexibleHeaderView.scrollPhasePercentage)
    }

}

// MARK: UICollectionViewDelegateFlowLayout
extension RestaurantList: UICollectionViewDelegateFlowLayout {

    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAt indexPath: IndexPath) -> CGSize {
        return CGSize(width: view.bounds.width - (RestaurantCell.cellPadding * 2), height: RestaurantCell.cellHeight)
    }

    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, insetForSectionAt section: Int) -> UIEdgeInsets {
        return UIEdgeInsets(top: RestaurantCell.cellPadding, left: RestaurantCell.cellPadding, bottom: RestaurantCell.cellPadding, right: RestaurantCell.cellPadding)
    }

    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, minimumLineSpacingForSectionAt section: Int) -> CGFloat {
        return RestaurantCell.cellPadding
    }

    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, minimumInteritemSpacingForSectionAt section: Int) -> CGFloat {
        return 0.0
    }

}

// MARK: UICollectionViewDataSource and Delegate
extension RestaurantList {

    override func numberOfSections(in collectionView: UICollectionView) -> Int {
        return 1
    }

    override func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return restaurants.count
    }

    override func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        if let cell = collectionView.dequeueReusableCell(withReuseIdentifier: RestaurantCell.cellID, for: indexPath) as? RestaurantCell {
        cell.restaurant = restaurants[indexPath.row]
            return cell
        } else {
            fatalError("Missing cell for indexPath: \(indexPath)")
        }
    }

    override func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {
        let restaurant = restaurants[indexPath.row]

        guard let url = restaurant.restaurantURL else {
            print("D")
            return
        }

        let config = SFSafariViewController.Configuration()
        config.entersReaderIfAvailable = true
        let safariVC = SFSafariViewController(url: url, configuration: config)
        self.present(safariVC, animated: true, completion: nil)
    }

}

// MARK: MDCTabBarDelegate
extension RestaurantList: MDCTabBarDelegate {

    func tabBar(_ tabBar: MDCTabBar, didSelect item: UITabBarItem) {
        refreshContent()
    }
}

// MARK: Data
extension RestaurantList {

    func refreshContent() {
        guard inProgressTask == nil else {
            inProgressTask?.cancel()
            inProgressTask = nil
            return
        }

        guard let selectedItem = tabBar.selectedItem else {
            return
        }

        let source = RestaurantSource.allValues[selectedItem.tag]

        inProgressTask = apiClient.restaurants(forSource: source) { [weak self] (restaurants, error) in
            self?.inProgressTask = nil
            if let restaurants = restaurants {
                self?.restaurants = restaurants
                self?.collectionView?.reloadData()
            } else {
                self?.showError()
            }
        }
  }

  func showError() {
        let message = MDCSnackbarMessage()
        message.text = NSLocalizedString("An error occurred while loading news.", comment: "")
        MDCSnackbarManager.show(message)
    
    }

}

