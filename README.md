## Merges directories together

## Motivation

- Used in [mesh](/crcn/mesh).
- Bootstrapping libraries
 

## Example

```javascript
var dirmr = require('dirmr'),
fs        = require("fs"),
mu        = require("mustache"),
tplData   = {};

dirmr().

//read the bootstrap directory for the target dirs
readdir(__dirname + "/src", /^(node|web)$/). 

//filter through template files, and fill them
filterFile(/\.tpl.\w+/, function(options, next) {
	
	fs.readFile(options.source, "utf8", function(err, content) {
		if(err) return next(err);	
		
		fs.writeFile(options.destination.replace(".tpl", ""), mu.to_html(content, tplData), next);

	});

}).

//copy all the files in the library directory
join(__dirname + "/lib"); //copy the filtered dirs to this directory
```


## API


### .dirmr([dirs])


```javascript
dirmr([__dirname + "/src/node", __dirname + "/src/web"]).
join(__dirname + "/lib");
```

### .join(directory)

Joins (merges) the target directories to the output folder

### .readdir(directory, filter)

Scans the given directory for dirs to merge

```javascript
dirmr().
readdir(__dirname + "/src",/^(node|web)$/).
join(__dirname + "/lib");
```


### .copyEach(outputDir)

Copies target directories to output directory without merging

```javascript
mergedir().
readdir(__dirname + "/src", /^(node|web)$/).
copyEach(__dirname + "/bootstrap").
complete(function(err, result) {
	
})
```

### .filterFile(search, fn)

Filters files before they're copied

```javascript
dirmr().
readdir(__dirname + "/src").
filterFile(function(options, next) {
	
	if(!/\.tpl\.\w+/.test(options.name)) return;

	//fs.writeFile(options.destination, mustache.to_html(...))

}).
join(__dirname + "/lib");
```

### .complete(callback)

Called once the operations are complete


