const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    devtool: "eval-cheap-module-source-map",
    entry: "./src/index.js",
    devServer: {
        port: 3000,
        static: {
            directory: path.join(__dirname, "dist"),
        },
    },
    // Configure how Webpack should handle Node.js environment variables in the browser environment
    node: {
        // Disable usage of the '__dirname' and '__filename' variables in the browser
        __dirname: false,
        __filename: false,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-env"],
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./index.html",
            inject: true,
        }),
    ],
};
