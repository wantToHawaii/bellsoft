const fs = require('fs');
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const generateHtmlPages = (pagesDir) => {
  const files = fs.readdirSync(path.resolve(__dirname, pagesDir));
  return files.map(filename => {
    return new HtmlWebpackPlugin({
      filename,
      template: path.resolve(__dirname, `${pagesDir}/${filename}`),
      chunks: [filename.replace('.html', '')],
    });
  });
};

const generateEntrypoints = (dir, ext) => {
  return fs.readdirSync(path.resolve(__dirname, dir))
    .filter(filename => filename.startsWith('page-'))
    .reduce((acc, filename) => {
      const name = filename.replace('page-', '').replace(ext, '');
      const fullPath = `${dir}/${filename}`;
      acc[name] = fullPath;
      return acc;
    }, {});
};

const htmlPages = generateHtmlPages('./src/pages');
const jsEntrypoints = generateEntrypoints('./src/scripts', '.js');
const cssEntrypoints = generateEntrypoints('./src/styles', '.scss');
const entrypoints = (() => {
  const keysFromCss = Object.keys(cssEntrypoints);
  const keysFromJs = Object.keys(jsEntrypoints);
  // take the biggest entries key map
  const allKeys = keysFromCss.length > keysFromJs.length ? keysFromCss : keysFromJs;
  // merge css and js entrypoints
  return allKeys.reduce((acc, key) => {
    const cssFile = cssEntrypoints[key];
    const jsFile = jsEntrypoints[key];
    acc[key] = [];
    if (jsFile) acc[key].push(jsFile); 
    if (cssFile) acc[key].push(cssFile); 
    return acc;
  }, {});
})();

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 3001,
    host: "0.0.0.0",
  },
  devtool: "inline-source-map",
  entry: entrypoints,
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ].concat(htmlPages),
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
