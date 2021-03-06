var Metalsmith  = require('metalsmith');
var sitemap = require('metalsmith-mapsite');
var robots = require('metalsmith-robots');
var markdown    = require('metalsmith-markdown');
var layouts     = require('metalsmith-layouts');
var permalinks  = require('metalsmith-permalinks');
var collections = require('metalsmith-collections');
var dateFormatter = require('metalsmith-date-formatter');
var drafts = require('metalsmith-drafts');
var helpers = require('handlebars-helpers')();
var postcss = require('metalsmith-postcss');

Metalsmith(__dirname)
.metadata({
	site: {
		baseurl: 'https://poyu.xyz',
		author: 'Poyu Chen',
		site_name: 'Poyu Chen\'s Website',
		base_title: 'Poyu.xyz'
	}
})
.source('./src')
.destination('./build')
.clean(true)
.use(drafts())
.use(markdown())
.use(collections({
	page: {
		sortBy: 'order'
	},
	projects: {
		sortBy: 'date',
		reverse: true
	}
}))
.use(dateFormatter({
	dates: ['date', 'lastmod'],
	format: 'MM/DD/YYYY'
}))
.use(permalinks({
	relative: false
}))
.use(layouts({
	engine: 'handlebars',
	partials: './partials'
}))
.use(postcss({
	plugins: {
		'postcss-nested': {},
		'cssnano': {}
	}
}))
.use(robots({
	"allow": ["/index", "/about", "/projects"],
	"sitemap": "https://poyu.xyz/sitemap.xml"
}))
.use(sitemap({
	hostname: 'https://poyu.xyz',
	omitIndex: true,
	changefreq: 'monthly'
}))
.build(function(err, files) {
	if (err) { throw err; }
});
