var _parsers = {},
fs = require("fs"),
mustache = require("mustache"),
ejs      = require("ejs");

module.exports = function(templateData) {


	return function(options, next) {
		
		var tpl = options.source.match(/\.(\w+)\.\w+$/);

		if(!tpl) return next();

		tpl = tpl[1];

		if(!_parsers[tpl]) return next();

		var parse = _parsers[tpl];

		fs.readFile(options.source, "utf8", function(err, content) {
				
			parse(content, templateData, function(content) {
				
				fs.writeFile(options.destination.replace("." + tpl, ""), content, next);
			});

		});
	}
	
}


var use = module.exports.use = function(type, parser) {
	_parsers[type] = parser;
}



use("mu", function(content, data, next) {
	
	next(mustache.to_html(content, data));

});

use("ejs", function(content, data, next) {
		
	next(ejs.render(content, { data: data }));

});