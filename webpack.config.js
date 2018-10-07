const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = [
  {
    target: "electron",
    node: {
      __dirname: false,
      __filename: false
    },
    resolve: {
      extensions: [".js", ".jsx"]
    },
    module: {
      rules: [
        {
          /*node_modulesを排除したjsxファイルがbabel-loaderの対象*/
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: "babel-loader"
        },
      ]
    },
    /*ビルドの起点となるファイルのパスを指定する*/
    entry: {
      "main/index": "./src/main/index.js",
      "renderer/app": "./src/renderer/app.jsx"
    },
    /*出力ファイルを指定*/
    output: {
      filename: "dist/js/[name].js"
    },
    devtool: "inline-source-map"
  },
  // {
  //   entry: {
  //     style: './src/stylesheets/index.scss',
  //   },
  //   output: {
  //     filename: './dist/css/bundle.css',
  //   },
  //   module: {
  //     loaders: [
  //       {
  //         test: /\.css$/,
  //         loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' }),
  //       },
  //       {
  //         test: /\.scss$/,
  //         loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader!sass-loader' }),
  //       },
  //     ],
  //   },
  //   plugins: [
  //     new ExtractTextPlugin('bundle.css'),
  //   ],
  // },
];
