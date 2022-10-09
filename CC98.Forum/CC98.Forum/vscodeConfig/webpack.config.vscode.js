const webpack = require('webpack')
const path = require('path')
const HTMLWebpackPlugin = require("html-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {
    mode: "development",

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader'
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        'sass-loader'
                    ]
                })
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
    },

    entry: {
        main: './Main.tsx',
        //冬季
        css_blue: './Themes/wuteng_blue.scss',
        //春季（浅）
        css_green: './Themes/forgive_green.scss',
        //春季（深）
        css_more_green: './Themes/deep_dark_green.scss',
        //夏季
        css_summer: './Themes/summer.scss',
        //秋季（橙）
        css_autumn_orange: './Themes/autumn_orange.scss',
        //秋季（红）
        css_autumn_red: './Themes/autumn_red.scss',
        //双十一
        css_singleday: './Themes/singleday_pink.scss',
        //中秋（暗）
        css_mid_autumn_dark: './Themes/mid_autumn_dark.scss',
        //中秋（亮）
        css_mid_autumn_light: './Themes/mid_autumn_light.scss',
        //小雪（暗）
        css_light_snow_dark: './Themes/light_snow_dark.scss',
        //小雪（亮）
        css_light_snow_light: './Themes/light_snow_light.scss',
        //春节（暗）
        css_spring_festival_dark: './Themes/spring_festival_dark.scss',
        //春节（亮）
        css_spring_festival_light: './Themes/spring_festival_light.scss',
        //仲春
        css_zhongchun: './Themes/zhongchun.scss',
        //端午
        css_dragon_boat_festival: './Themes/dragon_boat_festival.scss',
        //清明
        css_qingming: './Themes/qingming.scss',
        //秋色之空（暗）
        css_autumn_2022_dark:'./Themes/autumn_2022_dark.scss',
        //秋色之空（亮）
        css_autumn_2022_light:'./Themes/autumn_2022_light.scss',
    },

    output: {
        path: path.resolve(__dirname, 'wwwroot/'),
        // should use absolute path
        publicPath: '/',
        filename: 'static/scripts/[name].js'
    },

    devtool: 'source-map',

    externals: {
        'jquery': '$',
    },

    plugins: [
        // generate index.html
        new HTMLWebpackPlugin({
            template: 'Template.ejs',
            // place index.html at '/'
            filename: 'index.html',
            inject: false
        }),


        new CopyWebpackPlugin([
            // copy static/config file
            { from: 'wwwroot/static', to: 'static' },

            { from: 'node_modules/jquery/dist', to: 'static/scripts/lib/jquery/' },
            { from: 'node_modules/font-awesome', to: 'static/content/font-awesome/' },
            { from: 'node_modules/spectrum-colorpicker/spectrum.js', to: 'static/scripts/lib/spectrum/spectrum.js' },
            { from: 'node_modules/dplayer/dist/DPlayer.min.css', to: 'static/content/DPlayer.min.css' },
            { from: 'node_modules/aplayer/dist/APlayer.min.css', to: 'static/content/APlayer.min.css' },
            { from: 'node_modules/hls.js/dist/hls.min.js', to: 'static/content/hls.min.js' },
        ]),

        new ExtractTextPlugin('static/content/[name].css'),

        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),

    ],

    // webpack-dev-server config
    // "--hot" and "--inline" should be passed in package.json to enable HMR
    devServer: {
        // contentBase: path.resolve(__dirname, "wwwroot"),
        historyApiFallback: true,
        port: 8083,
        host: '0.0.0.0',

        // proxy: {
        //     '/1262843-1.flv': {
        //         target: 'http://file409.niconi.cc',
        //         changeOrigin: true,
        //     }
        // }
    },
}