const metalsmith = require('metalsmith');
// const collections = require('metalsmith-collections');
const markdown = require('metalsmith-markdown');
// const jquery = require('metalsmith-jquery');
// const permalinks = require('metalsmith-permalinks');
const layouts = require('metalsmith-layouts');
const siteConfig = require('./configs/site-config');
// const inPlace = require('metalsmith-in-place');
// const branch = require('metalsmith-branch');
// const excerpts = require('metalsmith-excerpts');

metalsmith(__dirname)
  .metadata(siteConfig)
  .source('./src')
  .destination('./build')
  .clean(true)
  .use(markdown())
  .use(layouts({
    engine: 'pug',
    default: 'default.pug',
    pretty: true,
  }))
  .build((err) => {
    if (err) throw err;
  });
