var seq = require("seq"),
walkr   = require("walkr"),
fs      = require("fs"),
_       = require("underscore"),
path    = require("path"),
mkdirp  = require("mkdirp");


module.exports = function(_dirs) {
	
	var _self = {}, 
	_walkr    = walkr(), 
	_seq      = seq(),
	_onComplete,
	_targetDirs = _dirs || [];


	_walkr.filter(walkr.copy, -999);

	/**
	 */

	_self.filterFile = function(search, callback, priority) {

		_walkr.filterFile(search, callback, priority);
		return _self;

	};

	/**
	 */

	_self.filterDir = function(search, callback, priority) {

		_walkr.filterDir(search, callback, priority);
		return _self;

	};

	/**
	 */

	_self.filter = function(search, callback, priority) {

		_walkr.filter(search, callback, priority);
		return _self;
		
	};


	/**
	 */

	_self.readdir = function(source, filter) {

		_seq.seq(function() {	

			fs.readdir(source, this);

		}).
		seq(function(dirs) {

			dirs = filter ? dirs.filter(_tester(filter)) : null;

			for(var i = dirs.length; i--;) {

				_targetDirs.push(source + "/" + dirs[i]);

			}


			this();

		}).
		catch(onComplete);


		return _self;
	};

	/**
	 */

	_self.clear = function() {
		
		_targetDirs = [];

		return _self;
	}

	/**
	 */

	_self.sort = function(callback) {
		
		_seq.seq(function() {
			
			_targetDirs = _targetDirs.sort(callback);

			this();

		});

		return _self;
			
	};

	/**
	 */

	_self.join = function(destination) {

		mkdir(destination);
		
		_seq.seq(function() {

			seq(_targetDirs).
			seqEach(function(dir) {

				var next = this;
				
				_walkr.start(dir, destination, this);

			}).
			seq(function() {

				this();

			}).
			catch(onComplete)
			
		});
		
		return _self;
	};

	/**
	 */

	_self.copyEach = function(destination) {

		mkdir(destination);
		
		_seq.seq(function() {

			seq(_targetDirs).
			seqEach(function(dir) {

				var next = this;

				_walkr.start(dir, destination + "/" + path.basename(dir), this);

			}).
			seq(function() {

				this();

			}).
			catch(onComplete)

		});

		return _self;
	}

	/**
	 */

	_self.complete = function(callback) {

		_onComplete = callback;

		return _self;

	};


	/**
	 */


	function onComplete(err, result) {

		if(_onComplete) _onComplete(err, result);

	}

	/**
	 */

	function mkdir(destination) {
		
		_seq.seq(function() {

			var next = this;

			mkdirp(destination, 0777, function() {

				next();	

			});

		});

	}

	/**
	 */

	function _tester(filter) {

		if(filter instanceof RegExp) {

			return function(item) {

				return filter.test(item);

			};

		} else {

			return filter;

		}

	}

	return _self;
}
