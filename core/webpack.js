const	webpack = require('webpack'),
		path = require('path');

module.exports = {
	devtool: 'source-map',
	entry: {
		'karrot': './index.ts'
	},
	mode: 'production',
	output: {
		path: __dirname + '/dist',
		publicPath: '/',
		filename: '[name].js',
	},
	resolve: {
		extensions: ['.ts', '.js']
	},
	module: {
		rules: [
			{ test: /\.ts?$/, use: "ts-loader" }
		]
	},
	plugins: [

	]
}