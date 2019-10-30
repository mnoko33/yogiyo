//
//  NewsClient.swift
//  YogiyoClone
//
//  Created by Jinyung Yoon on 2019/10/23.
//  Copyright © 2019 Jinyung Yoon. All rights reserved.
//

import Foundation

class RestaurantClient {

    struct Constants {

        static let apiKey = "771fc78686b64e0e82d7d65d9bcf4356"
        static let baseURL = URL(string: "https://newsapi.org/v1")!

        struct Paths {

            static let restaurant = "articles"

        }

        struct Keys {

            static let apiKey = "apiKey"
            static let source = "source"

        }

    }

    let urlSession: URLSession

    init() {
        let config = URLSessionConfiguration.default
        urlSession = URLSession(configuration: config)
    }

    typealias RestaurantsCompletion = (([Restaurant]?, Error?) -> Void)

    func restaurants(forSource source: RestaurantSource, completion: @escaping RestaurantsCompletion) -> Cancellable {
        let restaurantsURL = Constants.baseURL.appendingPathComponent(Constants.Paths.restaurant)
        var components = URLComponents(string: restaurantsURL.absoluteString)
        print(components)
        print(source.rawValue)
        components?.queryItems = [
            URLQueryItem(name : Constants.Keys.apiKey, value: Constants.apiKey),
            URLQueryItem(name : Constants.Keys.source, value: source.rawValue)
        ]
        print(components)
        guard let url = components?.url else {
            fatalError("Could not create url")
        }
        let task = urlSession.dataTask(with: url) { (data, _, error) in
            DispatchQueue.main.async {
                print("1")
                if let error = error {
                    print("2")
                    completion(nil, error)
                } else {
                    print("3")
//                    print(String(data: data!, encoding: .utf8))
                    print(type(of: data!))
                completion(RestaurantsResponse.parseRestaurants(fromJSON: data), nil)
                    print("4")
                }
            }
        }
        task.resume()
        return task
      }

}
