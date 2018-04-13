const metalsmith = require('metalsmith');
const collections = require('metalsmith-collections');
const markdown = require('metalsmith-markdown');
// const jquery = require('metalsmith-jquery');
const permalinks = require('metalsmith-permalinks');
const layouts = require('metalsmith-layouts');
const siteConfig = require('./configs/site-config');
const inPlace = require('metalsmith-in-place');
const branch = require('metalsmith-branch');
const excerpts = require('metalsmith-excerpts');

metalsmith(__dirname)
  .metadata(siteConfig)
  .source('./src')
  .destination('./build')
  .clean(true)
  .use(branch('pages/**.pug')
    .use(inPlace({
      engine: 'pug',
    }))
    .use(permalinks({
      pattern: ':title',
      relative: false,
    })))
  .use(branch('posts/**.md')
    .use(markdown())
    .use(excerpts())
    .use(collections({
      posts: {
        pattern: 'posts/**/*.html',
        sortBy: 'date',
        reverse: true,
      }
    }))
    .use(permalinks({
      pattern: 'posts/:date/:title',
      relative: false,
    })))
  .use(layouts({
    engine: 'pug',
    default: 'default.pug',
  }))
  .build((err) => {
    if (err) throw err;
  });
