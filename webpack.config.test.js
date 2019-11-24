const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    mode: "development",
    devtool: "eval-source-map",
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.scss$/,
                loader: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js', '.vue' ],
    },
    plugins: [
        new VueLoaderPlugin()
    ],
};