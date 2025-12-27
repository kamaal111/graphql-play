// swift-tools-version: 6.2
// The swift-tools-version declares the minimum version of Swift required to build this package.

import PackageDescription

let package = Package(
    name: "SwiftGraphQLPlayApp",
    platforms: [.macOS(.v14)],
    products: [
        .library(name: "SwiftGraphQLPlayApp", targets: ["SwiftGraphQLPlayApp"]),
    ],
    targets: [
        .target(name: "SwiftGraphQLPlayApp"),
    ]
)
