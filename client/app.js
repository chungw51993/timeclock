import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './app.config';
import home from './features/home';

angular.module('timeclock', [
  uirouter,
  home,
])
.config(routing);
