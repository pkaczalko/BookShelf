const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: "./src/index.js",
    plugins: [
        new HtmlWebpackPlugin({
        template: "./src/home.html"
    })
    ],
    module:{
        rules:[{
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use:{
                loader:"babel-loader",
                options: {
                    presets: ['@babel/preset-env','@babel/preset-react']
                }
            }
        },
        {
            test: /\.scss$/i,
            exclude: /(node_modules|bower_components)/,
            use: ["style-loader", "css-loader", "sass-loader"],
        }]
    },
};