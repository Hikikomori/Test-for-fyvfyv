const path = require(`path`);
const MiniCssExtractPlugin = require(`mini-css-extract-plugin`);
const webpack = require(`webpack`);


module.exports = {
  entry: [`./src/index.tsx`, `./src/styles/main.scss`],
  output: {
    filename: `bundle.js`,
    path: path.resolve(__dirname, `./public/dist`)
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === `development`,
            },
          },
          {
            loader: `css-loader`, options: {
              sourceMap: true
            }
          },
          {
            loader: `postcss-loader`,
            options: {
              sourceMap: true,
              config: {
                path: `postcss.config.js`
              }
            }
          },
          {
            loader: `sass-loader`, options: {sourceMap: true}
          }
        ]
      },
      {
        test: /\.(png|svg|jpe?g)$/i,
        use: [
          {
            loader: `file-loader`,
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: `babel-loader`,
        },
      },
      {
        test: /\.(ts|tsx)?$/,
        loader: `ts-loader`
      }
    ]
  },
  devServer: {
    contentBase: `./public`,
    compress: false,
    inline: true,
    publicPath: `http://localhost:8000/dist/`,
    watchContentBase: true,
    hot: true,
    historyApiFallback: true
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `bundle.css`,
    }),
    new webpack.ProvidePlugin({
      'React': `react`,
      'ReactDOM': `react-dom`
    }),
  ],
  resolve: {
    extensions: [`.ts`, `.tsx`, `.js`, `.jsx`, `json`],
    alias: {
      'assets': path.resolve(__dirname, `./src/assets`)
    }
  },
  devtool: `source-map`
};
