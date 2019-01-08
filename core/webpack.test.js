const	webpack = require('webpack'),
		path = require('path');

module.exports = {
	devtool: '#inline-source-map',
	entry: {
		'main': './index.ts'
	},
	mode: 'development',
	output: {
		path: path.resolve(__dirname, '..') + '/build',
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