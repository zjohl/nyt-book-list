const path = require('path');
const glob = require('glob');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

const PUBLIC_PATH = 'http://localhost:4000/js/';

module.exports = (env, options) => ({
    optimization: {
        minimizer: [
            new UglifyJsPlugin({ cache: true, parallel: true, sourceMap: false }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    entry: {
        './js/app.js': ['./js/app.js'].concat(glob.sync('./vendor/**/*.js')),
    },
    output: {
        filename: '[name]-[hash].js',
        path: path.resolve(__dirname, '../priv/static/js'),
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    },
                }
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.scss'],
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: '../css/app.css' }),
        new CopyWebpackPlugin([{ from: 'static/', to: '../' }]),
        new SWPrecacheWebpackPlugin({
                cacheId: 'book_list',
                dontCacheBustUrlsMatching: /\.\w{8}\./,
                filename: 'service-worker.js',
                minify: true,
                navigateFallback: PUBLIC_PATH + 'index.html',
                staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
        }),
    ]
});
