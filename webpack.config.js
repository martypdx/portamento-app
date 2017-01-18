const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/main.js',
    output: {
        path: '../portamento-server/public',
        filename: 'build.js'
    },

    devtool: 'source-map',
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new ExtractTextPlugin('main.css'),
        new CopyWebpackPlugin([{from: './images', to: 'images'}],
        // Did you have problems without this option?
        {copyUnmodified: true}
        )],

    module: {
        preLoaders: [{
            test: /\.js$/,
            loader: 'eslint-loader',
            exclude: /node_modules/
        }],
        loaders: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ['es2015']
            }
        }, {
            test: /\.scss$/,
            loader: 'style-loader!css-loader?sourceMap!sass-loader?sourceMap'
        }, {
            test: /\.html$/,
            loader: 'html-loader'
        }] // I don't see any css in your project
    },
    htmlLoader: {
        attrs: false
    },
    sassLoader: {
        includePaths: ['./src/scss/partials']
    }
};