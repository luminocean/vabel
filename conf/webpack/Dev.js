'use strict'; // eslint-disable-line

/**
 * Default dev server configuration.
 */
const webpack = require('webpack');
const WebpackBaseConfig = require('./Base');

class WebpackDevConfig extends WebpackBaseConfig {
    constructor() {
        super();
        this.config = {
            devtool: 'eval-source-map',
            entry: [
                'webpack-dev-server/client?http://0.0.0.0:8000/',
                'webpack/hot/only-dev-server',
                'react-hot-loader/patch',
                './client.js'
            ],
            plugins: [
                new webpack.HotModuleReplacementPlugin(),
                new webpack.NoEmitOnErrorsPlugin()
            ]
        };
    }
}

module.exports = WebpackDevConfig;
