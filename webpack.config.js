const
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin');

require('ts-loader');

module.exports = (dev) => ({
    entry: {
        editor: './src/Editor/index.tsx',
        wiki: './src/Wiki/Wiki.tsx'
    },
    output: {
        filename: '[name].js'
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },
    module: {
        loaders: [
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            {
                test: /\.tsx?$/,
                loader: 'ts-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            chunks: ['editor'],
            template: './src/Editor/index.html',
            filename: 'editor.html',
            cache: dev,
            hash: !dev,
        })
    ]
});