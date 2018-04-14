const metalsmith = require('metalsmith');
const markdown = require('metalsmith-markdown');
const layouts = require('metalsmith-layouts');
const permalinks = require('metalsmith-permalinks');
const collections = require('metalsmith-collections');
const config = require('./configs/site-config');

metalsmith(__dirname)
  .metadata(config)
  .use(collections({
    posts: {
      pattern: 'posts/**/*.md',
      sortBy: 'date',
      reverse: true,
    }
  }))
  .use(collections({
    pages: {
      pattern: 'pages/**/*.md',
    }
  }))
  .use(markdown())
  .use(permalinks())
  .use(layouts({
    engine: 'pug',
    directory: 'layouts',
  }))
  .build((err) => {
    if (err) throw err;
  });
