import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
  context: path.join(__dirname, 'client'),
  entry: [
    'webpack-hot-middleware/client?reload=true/__webpack_hmr',
    path.join(__dirname, 'client/app.js'),
  ],
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: 'app.bundle.js',
    publicPath: '/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.tpl.html',
      inject: 'body',
      filename: 'index.html',
    }),
  ],
  resolve: {
    extensions: ['.js', '.json'],
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015'],
        },
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass'],
        include: path.join(__dirname, 'client'),
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css'],
      },
      {
        test: /\.json$/,
        loaders: ['json'],
      },
    ],
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.json$/,
        use: ['json-loader'],
      },
    ],
  }
};
