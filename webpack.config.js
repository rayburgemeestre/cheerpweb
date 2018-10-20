const path = require('path');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const { VueLoaderPlugin } = require('vue-loader')


module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        'sass-loader'
                    ]
                })
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.vue$/,
                use: 'vue-loader'
            }
        ]
    },
    plugins: [
        new MonacoWebpackPlugin(),
        new ExtractTextPlugin('css/mystyles.css'),
        new VueLoaderPlugin()
    ]
};

