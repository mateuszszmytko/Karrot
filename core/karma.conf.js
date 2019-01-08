var webpackConfig = require('./webpack.test.js');

module.exports = function (config) {
	config.set({
		browsers: ['Chrome'],
		autoWatch: true,
		mime: { 'text/x-typescript': ['ts', 'tsx'] },
		frameworks: [
			'jasmine',
		],
		files: [
			'test.ts'
		],
		plugins: [
			'karma-webpack',
			'karma-jasmine',
			'karma-chrome-launcher',
			'karma-jasmine-html-reporter',
			'karma-html-reporter'
		],
		client: {
			clearContext: false
		},
		reporters: ['progress', 'kjhtml'],
		colors: true,
		preprocessors: {
			'**/*.ts': ['webpack']
		},
		browserConsoleLogOptions: {
			level: "debug", format: "%b %T: %m", terminal: false
		},
		webpack: {
			stats: 'errors-only',
			mode: 'development',
			module: webpackConfig.module,
			resolve: webpackConfig.resolve
		}
	})
}