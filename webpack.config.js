var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var plugins = [
    new ExtractTextPlugin("style.css", {
        allChunks: true,
        disable: false
    })
]

module.exports = {
    debug: true,
    // entry: './src/main.js',
    // output: {
    //     path: './dist',
    //     publicPath:'/dist/',
    //     filename: 'build.js',
    //     chunkFilename:"[id].build.js?[chunkhash]"
    // },
    entry: {
        app: './src/main.js',
    },
    output: {
        publicPath: '/dist/', //编译好的文件，在服务器的路径,这是静态资源引用路径
        path: './dist/', //编译到当前目录
        filename: 'build.js',
        chunkFilename:"[id].build.js?[chunkhash]"
    },
    cssnext: {
        browsers: "last 40 Chrome versions",
    },
    module: {
        loaders: [
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract(
                    "style-loader", 'css-loader?sourceMap!sass-loader!cssnext-loader'),
            }, {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract(
                    "style-loader", "css-loader?sourceMap!cssnext-loader"),
            },
            // { test: /\.scss$/, loader: 'style!css!sass!cssnext'},
            // { test: /\.css$/, loader: 'style!css!cssnext' },
            {
                test: /\.js(x)?$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015', 'stage-1', 'stage-3'],
                },
            },
            { test: /\.(jpg|png|gif)$/, loader: 'file-loader?name=images/[hash].[ext]'}
        ]
    },
    resolve: {
        extension: ['', '.js'],
    },
    plugins: plugins,
};