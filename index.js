var Metalsmith  = require('metalsmith');
var markdown    = require('metalsmith-markdown');
var layouts     = require('metalsmith-layouts');
var permalinks  = require('metalsmith-permalinks');
var collections = require('metalsmith-collections');
var dateFormatter = require('metalsmith-date-formatter');
var debug = require('metalsmith-debug');

Metalsmith(__dirname)
.metadata({})
.source('./src')
.destination('./build')
.clean(true)
.use(markdown())
.use(dateFormatter({
  format: 'MM/DD/YYYY'
}))
.use(collections({
  page: {
    sortBy: 'order'
  },
  projects: {
    sortBy: 'date',
    reverse: true
  }
}))
.use(permalinks())
.use(layouts({
  engine: 'handlebars',
  partials: './partials'
}))
.use(debug())
.build(function(err, files) {
  if (err) { throw err; }
});
