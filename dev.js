var Metalsmith  = require('metalsmith');
var markdown    = require('metalsmith-markdown');
var layouts     = require('metalsmith-layouts');
var permalinks  = require('metalsmith-permalinks');
var collections = require('metalsmith-collections');
var dateFormatter = require('metalsmith-date-formatter');
var debug = require('metalsmith-debug');
var watch = require('metalsmith-watch');
var serve = require('metalsmith-serve');
var drafts = require('metalsmith-drafts');
var helpers = require('handlebars-helpers')();

Metalsmith(__dirname)
.metadata({})
.source('./src')
.destination('./build')
.clean(true)
.use(drafts())
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
.use(watch({
  paths: {
    "${source}/**/*": true,
    "./partials/**/*": "**/*",
    "./layouts/**/*": "**/*",
  }
})
)
.use(serve())
.build(function(err, files) {
  if (err) { throw err; }
});
