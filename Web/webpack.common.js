const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: "./src/index.js",
    plugins: [
        new HtmlWebpackPlugin({
        template: "./src/homePage/home.html"
    })
    ],
    module:{
        rules:[{
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use:{
                loader:"babel-loader",
                options: {
                    presets: ['@babel/preset-env','@babel/preset-react'],
                    plugins: ['@babel/plugin-proposal-class-properties']
                }
            }
        },
        {
            test: /\.html$/,
            use: ["html-loader"]
        },
        {
            test: /\.(svg|png|jpg|gif)$/,
            use: {
                loader:"file-loader",
                options:{
                    name: "[name].[contenthash].[ext]",
                    outputPath: "imgs"
                }
            }
        }]
    },
};