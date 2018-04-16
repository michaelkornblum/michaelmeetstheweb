const metalsmith = require('metalsmith');
const markdown = require('metalsmith-markdown');
const layouts = require('metalsmith-layouts');
const permalinks = require('metalsmith-permalinks');
const collections = require('metalsmith-collections');
const config = require('./configs/site-config');
const jquery = require('metalsmith-jquery');

metalsmith(__dirname)
  .metadata(config)
  .use(markdown({
    gfm: true,
  }))
  .use(jquery(($) => {
    $('p img').parent().addClass('killMe');
    $('p img').insertBefore('p');
    $('.killMe').remove();

    $('img').each((i, el) => {
      const image = $(el);
      const source = image.attr('src');
      const delimeter = source.lastIndexOf('.');
      const fileName = source.slice(0, delimeter);
      const fileExt = source.slice(delimeter);
      const srcset = `
        ${fileName}-320w${fileExt} 320w,
        ${fileName}-480w${fileExt} 480w,
        ${fileName}-800w${fileExt} 320w, 
      `;
      const sizes = `
        (max-width: 320px) 280px,
        (max-width: 480px) 440px,
        800px
      `;
      const src = `${fileName}-320w${fileExt}`;
      image.attr('data-srcset', srcset);
      image.attr('data-sizes', sizes);
      image.attr('data-src', src);
    });
  }
))
  .use(collections({
    posts: {
      pattern: 'posts/**/*.html',
      sortBy: 'date',
      reverse: true,
    },
  }))
  .use(collections({
    pages: {
      pattern: 'pages/**/*.html',
    },
  }))
  .use(permalinks())
  .use(layouts({
    engine: 'pug',
    directory: 'layouts',
  }))
  .build((err) => {
    if (err) throw err;
  });
