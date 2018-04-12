const _ = require('lodash');
const moment = require('moment');

module.exports = {
  site: {
    siteName: 'Michael Meets the Web',
    siteUrl: 'michaelmeetstheweb.com',
    description: 'the blog site of Michael Kornblum',
    author: 'Michael Kornblum',
    generatorName: 'Metalsmith',
    generatorUrl: 'http://metalsmith.io',
  },
  helpers: {
    _,
    moment,
  },
};
