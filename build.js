const metalsmith = require('metalsmith');
const markdown = require('metalsmith-markdown');
const layouts = require('metalsmith-layouts');
const permalinks = require('metalsmith-permalinks');
const collections = require('metalsmith-collections');
const jquery = require('metalsmith-jquery');

const config = require('./configs/site-config');


metalsmith(__dirname)
  // pull metadata from external object
  .metadata(config)
  // parse markdown to HTML
  .use(markdown({
    gfm: true,
  }))
  // manipulate dom objects
  .use(jquery(($) => {

    // remove surrounding p tags from images
    $('img').each((i, el) => {
      const $p = $(el).parent();
      $(el).insertAfter($(el).parent());
      $p.remove();
    });
    
    // add srcsets and sizes to images
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

      image.attr('srcset', srcset);
      image.attr('sizes', sizes);
    });
  }))

  // bundle processed files into collections
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
      sortBy: 'pageOrder',
    },
  }))

  // make file links pretty
  .use(permalinks())

  // combine files with template
  .use(layouts({
    engine: 'pug',
    directory: 'layouts',
  }))

  // build completed pages
  .build((err) => {
    if (err) throw err;
  });
