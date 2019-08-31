const webpackMerge = require('webpack-merge'),
    baseConfig = require('./webpack.base'),
    MiniCssExtractPlugin = require("mini-css-extract-plugin"),
    OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin"),
    UglifyJsPlugin = require("uglifyjs-webpack-plugin"),
    autoprefixer = require('autoprefixer'),
    HtmlReplaceWebpackPlugin = require('html-replace-webpack-plugin'),
    ImageminWebpWebpackPlugin = require("imagemin-webp-webpack-plugin"),
    WebpCSSPlugin = require("./libs/webp-css");

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = webpackMerge(baseConfig, {
    mode: ENV,
    devtool: 'source-map',

    optimization: {
        minimizer: [
            new OptimizeCSSAssetsPlugin({
                cssProcessorOptions: { map: { annotation: true, inline: false, } }
            }),
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
        ]
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader', options: {
                            sourceMap: true,
                            url: (url) => {
                                return url.includes('.webp');
                            },
                        }
                    },
                    { loader: 'postcss-loader', options: { sourceMap: true, importLoaders: 1, plugins: () => [autoprefixer({ browsers: ["Explorer >= 11", "last 2 versions"] }), WebpCSSPlugin] } },
                    { loader: 'sass-loader', options: { sourceMap: true, } }
                ]
            }
        ]
    },
    plugins: [
        new HtmlReplaceWebpackPlugin([
            {
                pattern: /<img(?! loaded)[^>]+?((?:data-){0,1}src="([^"]+?.(png|jpg){1})")[^>]+?>/g,
                replacement: function (match, src, file, prefix) {
                    const filename = file.replace(prefix, 'webp');

                    const picture = `
<picture>
    <source ${src.replace('src=', 'srcset=').replace(file, filename)} type="image/webp"> 
    ${match.replace('<img', '<img loaded')}
</picture>
                    `;

                    return picture;
                }
            }
        ]),
        new ImageminWebpWebpackPlugin({
            config: [{
                test: /\.(jpe?g|png)/,
                options: {
                    quality: 75
                }
            }],
            overrideExtension: true,
            detailedLogs: false,
            strict: true
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ]
});