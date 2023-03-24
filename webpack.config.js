const path = require('path');

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist")
    },
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