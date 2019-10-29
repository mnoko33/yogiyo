//
//  Article.swift
//  YogiyoClone
//
//  Created by Jinyung Yoon on 2019/10/23.
//  Copyright © 2019 Jinyung Yoon. All rights reserved.
//

import Foundation

struct RestaurantsResponse: Codable {

    let restaurants: [Restaurant]
    
    

    static func parseRestaurants(fromJSON data: Data?) -> [Restaurant]? {
        guard let data = data else {
            return nil
        }

        let decoder = JSONDecoder()
        decoder.dateDecodingStrategy = .iso8601
        do {
            print("error1")
            print(RestaurantsResponse.self)
            print(data.debugDescription)
            let restaurantResponse = try decoder.decode(RestaurantsResponse.self, from: data)
            print(restaurantResponse.restaurants)
            return restaurantResponse.restaurants
        } catch {
            print("error2")
            NSLog("Error parsing articles: \(error)")
        }
        return nil
    }

}

struct Restaurant: Codable {

    let title: String
    let description: String?
    let url: String?
    let urlToImage: String?
    let publishedAt: Date?

    var restaurantURL: URL? {
        if let url = url {
            return URL(string: url)
        }
        return nil
    }

    var imageURL: URL? {
        if let url = urlToImage {
            return URL(string: url)
        }
        return nil
    }

}
