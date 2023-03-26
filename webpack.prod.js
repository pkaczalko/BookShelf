const path = require('path');
const common = require('./webpack.common');
const merge = require('webpack-merge');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge.merge(common, {
    mode: "production",
    output: {
        filename: 'main.[contenthash].js',
        path: path.resolve(__dirname, "dist")
    },
    plugins: [
        new MiniCssExtractPlugin({filename: "[name].[contenthash].css"}),
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [
          {
            test: /\.scss$/i,
            exclude: /(node_modules|bower_components)/,
            use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
          }
        ],
    } 
});