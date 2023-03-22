const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const mode = process.env.NODE_ENV || 'development';
const devMode = (mode === 'development');
const target = devMode ? 'web' : 'browserslist';
const devtool = devMode ? 'source-map' : undefined;

module.exports = {
    mode,
    target,
    devtool,
    entry: "./src/js/index.js",
    devServer: {
        port: 8080,
        hot: true
    },
    module: {
        rules: [
            {
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                },
                test: /\.js$/,
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [
                    devMode? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options:{
                            postcssOptions: {
                                plugins: [require('postcss-preset-env')]
                            }
                        }
                    }
                ],
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|ttf|woff|woff2|eot)$/,
                type: 'asset/resource'
            }
        ]
    },
    optimization: {
        minimizer: [
            new CssMinimizerPlugin({
            exclude: /node_modules/
        }),
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            title: 'Weather App',
            minify: {
                removeAttributeQuotes: devMode,
                collapseWhitespace: devMode,
                removeComments: devMode
            }
        }),
        new TerserWebpackPlugin({
            extractComments: false, 
            exclude: /node_modules/
        }),
        new MiniCssExtractPlugin({filename: '[name].[contenthash].css'}),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns:[
                {
                    from: path.resolve(__dirname, 'src/images'),
                    to: path.resolve(__dirname, 'dist/assets')
                }
            ]
        })
    ],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].[contenthash].js",
        assetModuleFilename: 'assets/[name][ext]'
    }
}