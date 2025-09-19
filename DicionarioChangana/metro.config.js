// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");

module.exports = (() => {
	const config = getDefaultConfig(__dirname);

	// Allow Metro to bundle CSV files as assets
	config.resolver.assetExts.push("csv");

	return config;
})();
