const path = require('path');
const common = require('./webpack.common');
const merge = require('webpack-merge');

module.exports = merge.merge(common, {
    mode: "development",
    entry: "./src/index.js",
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, "dist")
    },
    module: {
        rules: [
          {
            test: /\.(scss|less|css)$/i,
            use: ['style-loader', 'css-loader', "sass-loader"]
          }
        ],
    }
});