const metalsmith = require('metalsmith');
const collections = require('metalsmith-collections');
const markdown = require('metalsmith-markdown');
const jquery = require('metalsmith-jquery');
const permalinks = require('metalsmith-permalinks');
const layouts = require('metalsmith-layouts');
const siteConfig = require('./configs/site-config');
const _ = require('lodash');
const moment = require('moment');

metalsmith(__dirname)
  .metadata({ siteConfig })
  .source('./src')
  .destination('./build')
  .clean(true)
  .use(markdown())
  .build((err) => {
    if (err) throw err;
  });
