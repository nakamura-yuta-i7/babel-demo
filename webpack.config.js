// var webpack = require('webpack');
// var ExtractTextPlugin = require("extract-text-webpack-plugin");
// var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
// var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
	.filter(function(x) {
		return ['.bin'].indexOf(x) === -1;
	})
	.forEach(function(mod) {
		console.log( "node_modules/.bin/:", mod ); // DEBUGしてみている
		nodeModules[mod] = 'commonjs ' + mod;
	});

module.exports = [
	{
		name: 'server',
		entry: {
			app: './src/server/app.js',
		},
		target: 'node',
		output: {
			path: __dirname + "/dist/server",
			filename: "[name].js",
		},
		externals: nodeModules,
		module: {
			loaders: [
				{
					test: /\.jsx?$/,
					exclude: /(node_modules|bower_components)/,
					loader: "babel-loader?presets[]=es2015",
				},
			]
		},
		devtool: 'inline-source-map',
	},
	{
		name: 'web',
		entry: {
			app: './src/web/app.js',
		},
		output: {
			path: __dirname + "/dist/public",
			filename: "javascripts/[name].js",
		},
		module: {
			loaders: [
				{
					test: /\.jsx?$/,
					exclude: /(node_modules|bower_components)/,
					loader: "babel-loader?presets[]=es2015",
				},
			]
		},
		devtool: 'inline-source-map',
	},
];
