import express from 'express';
import mongoose from 'mongoose';
import path from 'path';

global.Promise = mongoose.Promise = require('bluebird');

import bodyParser from 'body-parser';
import morgan from 'morgan';
import compression from 'compression';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import webpackConfig from './../webpack.config';

const compiler = webpack(webpackConfig);
const middleware = webpackMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
  contentBase: 'src',
  stats: {
    colors: true,
    hash: false,
    timings: true,
    chunks: false,
    chunkModules: false,
    modules: false,
  },
});

const app = express();
mongoose.connect('mongodb://localhost/timeclock');

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, '../')));

const isDeveloping = process.env.NODE_ENV !== 'production';
if (isDeveloping) {
  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.get('*', (req, res) => {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, '../dist/index.html')));
    res.end();
  });
} else {
// Middleware - In production, force client to use HTTPS via redirect
  app.use((req, res, next) => {
    if ((!req.secure) && (req.get('X-Forwarded-Proto') !== 'https')) {
      res.redirect('https://' + req.get('Host') + req.url);
    }
    next();
  });

  app.use(compression());
  app.use(express.static(path.join(__dirname, '../dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
}

app.listen(process.env.PORT, () => {
  console.log('Timeclock is running on port ', process.env.PORT);
});
