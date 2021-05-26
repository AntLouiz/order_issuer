var path = require('path');
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');

module.exports = {
    entry:  path.join(__dirname, 'frontend/assets/src/js/index.js'),
    output: {
        path: path.join(__dirname, 'frontend/assets/dist'),
        filename: '[name]-ed53686b-ce2f-4124-bf38-78fc67f877be.js'
    },
    plugins: [
        new BundleTracker({
            path: '__dirname',
            filename: 'webpack-stats.json'
        }),
        new webpack.DefinePlugin({
            'API_URL': JSON.stringify(process.env.API_URL)
        })
    ],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                  'style-loader',
                  'css-loader',
                  'sass-loader'
                ]
            }
        ],
    },}
