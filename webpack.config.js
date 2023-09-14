const HtmlWebpackPlugin =
require ('html-webpack-plugin');

const path = require('path');

const CopyPlugin = 
require("copy-webpack-plugin");

const devServer = isDev => isDev
? {
    devServer: {
        open: true,
        hot: true,
        port: 8080,
        static: path.join(__dirname, 'dest'),
    },
}
: {};

const MiniCssPlugin =
require('mini-css-extract-plugin');

module.exports = (env, arvg) => ({
    Plugins: [
        new HtmlWebpackPlugin ({ template:
        'src/index.html'})
    ],

    entry: './src/script.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            }
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        filename: 'script.js',
        path: path.resolve(__dirname,'dest'),
        clean: true,
    },

    plugins: [
        new CopyPlugin({
            patterns: [
                { from: 'src/assets', to: 'assets'},
            ],
        }),
    ],

    mode: arvg.mode === 'development' ? 'development' : 'production',
    devtool: arvg.mode === 'development' ? 'inline-source-map' : false,
    ...devServer(arvg.mode === 'development'),

    module: {
        rules: [
            {
                test: /\.scss$/i,
                use: [MiniCssPlugin.loader, {
                    loader: 'css-loader',
                    options: {
                        url: false
                    }}, 'sass-loader'],
                },
            ],
        },
    plugins: [
        new MiniCssPlugin({ filename:'style.css'}),
    ],

    Plugins: [
        new CopyPlugin ({
            patterns: [
                {
                    from: 'src/404.html', to: '404.html' },
            ],
        }),
    ]


});