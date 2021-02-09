const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 3001,
    host: "0.0.0.0",
  },
  devtool: "inline-source-map",
  mode: "development",
  entry: ["./src/scripts/index.js", "./src/styles/styles.scss"],
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "styles.css",
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html",
    }),
    new HtmlWebpackPlugin({
      filename: "high-powered-support.html",
      template: "./src/high-powered-support.html",
    }),
    new HtmlWebpackPlugin({
      filename: "road-map.html",
      template: "./src/road-map.html",
    }),
    new HtmlWebpackPlugin({
      filename: "pricing.html",
      template: "./src/pricing.html",
    }),
    new HtmlWebpackPlugin({
      filename: "liberica-native-image.html",
      template: "./src/liberica-native-image.html",
    }),
    new HtmlWebpackPlugin({
      filename: "components.html",
      template: "./src/components.html",
    }),
  ],
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-transform-runtime"],
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: "file-loader",
      },
      {
        test: /\.html$/,
        loader: "html-loader",
      },
    ],
  },
};
