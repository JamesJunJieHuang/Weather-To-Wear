const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const fs = require("fs");

module.exports = {
  entry: "./client/index.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
    publicPath: "/",
  },
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.s?css/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.jsx?/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.(png)$/,
        use: ["file-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
  ],
  devServer: {
    static: {
      publicPath: "/",
      directory: path.resolve(__dirname, "build"),
    },
    proxy: {
      "/": "http://localhost:3000/",
    },
  },
};
