import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function () {
  this.route('welcome', function () {
    this.route('diet');
    this.route('intro');
    this.route('activity');
    this.route('perk');
  });
});

export default Router;
