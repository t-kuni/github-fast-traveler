const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = env => {
    return {
        devtool: "", // FIXME 有効にするとembedded_script.jsが動作しなくなる 'unsafe-eval'にひっかかる
        entry  : {
            popup         : './src/Application/popup.js',
            content_script: './src/Application/content_script.js',
            embedded_script: './src/Application/embedded_script.js',
        },
        module: {
            rules: [
                {
                    test: /\.vue$/,
                    loader: 'vue-loader'
                },
                {
                    test: /\.scss$/,
                    loader: ['style-loader', 'css-loader', 'sass-loader']
                }
            ]
        },
        plugins: [
            new CopyPlugin([
                {from: 'src/Application/popup.html'},
            ]),
            new VueLoaderPlugin()
        ],
    }
};