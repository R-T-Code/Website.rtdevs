const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: [
        'font-awesome/scss/font-awesome.scss',
        './src/js/index.js'
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './dist'),
        publicPath: ''
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader, 'css-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader' ,'sass-loader'
                ]
            },
            {
                test: /\.(png|jpg)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['stage-0']
                    }
                }
            },
            {
                test: /\.hbs$/,
                use: [
                    'handlebars-loader'
                ]
            },
            {
                test: /font-awesome\.config\.js/,
                use: [
                    {loader: 'style-loader'},
                    {loader: 'font-awesome-loader'}
                ]
            },
            {
                test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/'
                    }
                }]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'style.css'
        }),
        new HtmlWebpackPlugin({
            title: 'R.T.devs. &mdash; Robertas Tamulionis Portfolio Site',
            filename: 'index.html',
            template: 'src/index.hbs',
            description: 'R.T.devs. &mdash; Robertas Tamulionis Portfolio Site'
        }),
        new HtmlWebpackPlugin({
            title: 'R.T.devs. &mdash; Robertas Tamulionis Portfolio Site',
            filename: 'applications.html',
            template: 'src/applications.hbs',
            description: 'R.T.devs. &mdash; Robertas Tamulionis Portfolio Site'
        }),
        new HtmlWebpackPlugin({
            title: 'R.T.devs. &mdash; Robertas Tamulionis Portfolio Site',
            filename: 'websites.html',
            template: 'src/websites.hbs',
            description: 'R.T.devs. &mdash; Robertas Tamulionis Portfolio Site'
        }),
        new HtmlWebpackPlugin({
            title: 'R.T.devs. &mdash; Robertas Tamulionis Portfolio Site',
            filename: 'playground.html',
            template: 'src/playground.hbs',
            description: 'R.T.devs. &mdash; Robertas Tamulionis Portfolio Site'
        }),
        new CopyWebpackPlugin([
            {
                from: 'src/img/*',
                to: 'img/[name].[ext]'
            }
        ])
    ]
}