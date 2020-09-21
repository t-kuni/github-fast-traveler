const CopyPlugin      = require('copy-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = env => {
    return {
        devtool: "", // FIXME 有効にするとembedded_script.jsが動作しなくなる 'unsafe-eval'にひっかかる
        entry  : {
            popup          : './src/Application/popup.js',
            content_script : './src/Application/content_script.js',
            embedded_script: './src/Application/embedded_script.js',
        },
        module : {
            rules: [
                {
                    test  : /\.vue$/,
                    loader: 'vue-loader'
                },
                {
                    test  : /\.scss$/,
                    loader: ['style-loader', 'css-loader', 'sass-loader']
                },
                {
                    test   : /\.tsx?$/,
                    use    : [
                        {loader: 'cache-loader'},
                        {
                            loader : 'thread-loader',
                            options: {
                                // there should be 1 cpu for the fork-ts-checker-webpack-plugin
                                workers    : require('os').cpus().length - 1,
                                poolTimeout: Infinity // set this to Infinity in watch mode - see https://github.com/webpack-contrib/thread-loader
                            },
                        },
                        {
                            loader : 'ts-loader',
                            options: {
                                happyPackMode: true // IMPORTANT! use happyPackMode mode to speed-up compilation and reduce errors reported to webpack
                            }
                        }
                    ],
                    exclude: /node_modules/,
                },
            ]
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js', '.vue'],
        },
        plugins: [
            new CopyPlugin({
                patterns: [
                    {from: 'src/Application/popup.html'},
                ]
            }),
            new VueLoaderPlugin(),
        ],
    }
};