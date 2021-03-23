const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  mode: "development",
  entry: ["./public/src/main.js", "./public/sass/main.scss"],
  //entry: ["babel-pollyfill", "./public/src/main.js"],
  devtool: "inline-source-map",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "http://localhost:3000",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
  devServer: {
    contentBase: path.resolve(__dirname + "/dist"),
    index: "index.html",
    port: 3000,
    writeToDisk: true,
    hot: true, // 저장하면 바로 설정되는? 아마두.. -> 코드 짜고 저장하면 새로고침 안해도 반영됨
  },
};
