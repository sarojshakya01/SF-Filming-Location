var path = require("path");
var webpack = require("webpack");
module.exports = {
  entry: "./src/index.js",
  mode: "development",
  output: {
    path: path.join(__dirname, "public"),
    publicPath: "/client/",
    filename: "bundle.js",
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        query: {
          presets: [
            "@babel/preset-env",
            "@babel/react",
            {
              plugins: ["@babel/plugin-proposal-class-properties"],
            },
          ],
        },
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader",
      },
    ],
  },
};
