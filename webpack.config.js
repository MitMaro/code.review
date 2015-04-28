'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
		client: './app/client/js/client.jsx',
		vendor: ['react']
	},
	output: {
		path: path.join(__dirname, 'build', 'client'),
		filename: path.join('js', '[name].js')
	},
	module: {
		loaders: [
			{
				//tell webpack to use jsx-loader for all *.jsx files
				test: /\.jsx$/,
				loader: 'jsx-loader?harmony'
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: 'app/client/index.html'
		}),
		new webpack.optimize.CommonsChunkPlugin(
			'vendor', path.join('js', 'vendor.bundle.js')
		)
	],
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	devtool: 'inline-source-map'
};
