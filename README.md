## Merges directories together

 

 Example

```javascript
var dirmr = require('dirmr');

dirmr().
readdir(__dirname + "/src", ["node", "web"]).
join(__dirname + "/lib");


```


## API


### .dirmr([dirs])


```javascript
dirmr([__dirname + "/src/node", __dirname + "/src/web"]).
join(__dirname + "/lib");
```

### .join(output)

Joins the target directories to the output folder

### .readdir(directory, filter)

Scans the given directory for dirs to merge

```javascript
dirmr().
readdir(__dirname + "/src", ["node", "web"]).
join(__dirname + "/lib");
```


### .copyEach(outputDir)

Copies target directories to output directory without merging

```javascript
mergedir().
readdir(__dirname + "/src", ["node", "web"]).
copyEach(__dirname + "/bootstrap");
```

### .filterFile(fn)

Filters files before they're copied

```javascript
dirmr().
readdir(__dirname + "/src", ["node", "web"]).
filterFile(function(options, next) {
	
	if(!/\.tpl\.\w+/.test(options.name)) return;

	//fs.writeFile(options.destination, mustache.to_html(...))

}).
join(__dirname + "/lib");
```


