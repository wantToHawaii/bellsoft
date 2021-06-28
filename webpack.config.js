const fs = require('fs');
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const generateHTMLPages = (pagesDir) => {
  const files = fs.readdirSync(path.resolve(__dirname, pagesDir));
  return files.map(filename => {
    return new HtmlWebpackPlugin({
      filename,
      template: path.resolve(__dirname, `${pagesDir}/${filename}`),
    });
  });
};

const htmlPages = generateHTMLPages('./src/pages');

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
  ].concat(htmlPages),
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
