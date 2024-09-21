import { defineConfig } from "@rspack/cli";
import { rspack } from "@rspack/core";
import * as RefreshPlugin from "@rspack/plugin-react-refresh";
import { ModuleFederationPlugin } from "@module-federation/enhanced/rspack";
import { dependencies } from "./package.json";

const isDev = process.env.NODE_ENV === "development";

// Target browsers, see: https://github.com/browserslist/browserslist
const targets = ["chrome >= 87", "edge >= 88", "firefox >= 78", "safari >= 14"];

export default defineConfig({
	context: __dirname,
	entry: {
		main: "./src/main.tsx",
	},
	devServer: {
		port: 3001,
	},
	resolve: {
		extensions: ["...", ".ts", ".tsx", ".jsx"],
	},
	module: {
		rules: [
			{
				test: /\.svg$/,
				type: "asset",
			},
			{
				test: /\.(jsx?|tsx?)$/,
				use: [
					{
						loader: "builtin:swc-loader",
						options: {
							jsc: {
								parser: {
									syntax: "typescript",
									tsx: true,
								},
								transform: {
									react: {
										runtime: "automatic",
										development: isDev,
										refresh: isDev,
									},
								},
							},
							env: { targets },
						},
					},
				],
			},
		],
	},
	plugins: [
		new ModuleFederationPlugin({
			name: "feed",
			filename: "static/js/remoteEntry.js",
			exposes: {
				"./routes": "./src/routes",
			},
			shared: {
				...dependencies,

				react: {
					singleton: true,
					eager: true,
					requiredVersion: dependencies.react,
				},
				"react-dom": {
					singleton: true,
					eager: true,
					requiredVersion: dependencies["react-dom"],
				},
				"react-router-dom": {
					singleton: true,
					eager: true,
					requiredVersion: dependencies["react-router-dom"],
				},
			},
		}),
		new rspack.HtmlRspackPlugin({
			template: "./index.html",
		}),
		isDev ? new RefreshPlugin() : null,
	].filter(Boolean),
	optimization: {
		minimizer: [
			new rspack.SwcJsMinimizerRspackPlugin(),
			new rspack.LightningCssMinimizerRspackPlugin({
				minimizerOptions: { targets },
			}),
		],
	},
	experiments: {
		css: true,
	},
});
