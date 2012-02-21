var structr = require("structr"),
fs          = require("fs");

module.exports = function(repl, obj) {

	function dest(search, file) {

		return file.replace(search, repl);

	}

	function merge(options, callback) {

		var tcopy = structr.copy(obj);

		options.destination = dest(options.search, options.destination);

		
		var fromObj = readJSON(options.source),
		toObj       = readJSON(options.destination);


		structr.copy(fromObj, tcopy);
		structr.copy(toObj, tcopy);

		fs.writeFile(options.destination, JSON.stringify(tcopy, null, 2), callback);
	}


	return merge;
}

function readJSON(path) {
	
	var str;

	try {

		str = fs.readFileSync(path, "utf8");

	} catch(e) {

		return {};	

	}


	return JSON.parse(str);
}