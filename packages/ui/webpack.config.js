// https://webpack.js.org/guides/asset-management/
// https://webpack.js.org/guides/typescript/#importing-other-assets

const path = require("path");
module.exports = {
  entry: "/src/index.ts",
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.svg$/i,
        type: "asset",
        resourceQuery: /url/, // *.svg?url
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]s?$/,
        resourceQuery: { not: [/url/] }, // exclude react component if *.svg?url
        use: [{ loader: "@svgr/webpack", options: { typescript: true } }],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".d.ts"],
  },
  output: {
    filename: "ui.[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
    library: "evmbjui",
    libraryTarget: "umd",
    globalObject: "this",
  },
  mode: "development",
  optimization: {
    usedExports: true,
  },
};
