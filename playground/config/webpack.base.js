const path = require('path'),
    MiniCssExtractPlugin = require("mini-css-extract-plugin"),
    OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin"),
    UglifyJsPlugin = require("uglifyjs-webpack-plugin"),
    autoprefixer = require('autoprefixer'),
    HtmlWebpackPlugin = require('html-webpack-plugin');;

const srcDir = path.resolve(__dirname, '../../'); // resolve project src directory
module.exports = {
    devtool: 'source-map',
    entry: {
        polyfills: './src/polyfills.js',
        main: './src/page.js',
    },

    output: {
        path: path.resolve('./build'),
        publicPath: '',
        filename: '[name].js',
        chunkFilename: '[id].chunk.js'
    },
    resolve: {
        extensions: ['.ts', '.tsx', ".js", ".json"],
        alias: {
            "@karrot": path.resolve(srcDir)
        }
    },

    module: {
        rules: [
            { test: /\.ts?$/, use: "ts-loader" },
            {
                test: /\.html$/,
                loader: 'html-loader?attrs[]=img:src&attrs[]=video:src&attrs[]=source:src'
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file-loader?name=assets/[name].[ext]'
            },
            {
                test: /\.(webm|mp4)$/,
                loader: 'file-loader?name=assets/[name].[ext]'
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            filename: 'index.html',
        })
    ]
};