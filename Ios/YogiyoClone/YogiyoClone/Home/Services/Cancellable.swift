//
//  Cancellable.swift
//  YogiyoClone
//
//  Created by Jinyung Yoon on 2019/10/23.
//  Copyright © 2019 Jinyung Yoon. All rights reserved.
//

import Foundation

protocol Cancellable {

    func cancel()

}

extension URLSessionTask: Cancellable {}
