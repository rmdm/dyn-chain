module.exports = (function(){
  
  var _deps = {};
  var _acts = {};
  
  function Injector(deps){
    var acts = [];
	deps.forEach(function(dep){
	  acts.push(_acts[dep]);
	});
	return acts;
  }
  
  function define(step, deps, wrap){
    if(!_deps[step]){
	  _deps[step] = deps;
	  _acts[step] = wrap.apply(Injector(deps));
	}
  }
  
  function redefine(step, deps, wrap){
    if(_deps[step]){
	  _deps[step] = deps;
	  _acts[step] = wrap.apply(Injector(deps));
	}
  }
  
  function remove(step){
    delete _deps[step];
	delete _acts[step];
  }
  
  function exec(step, args){
    if(_acts[step]){
	  _acts[step].apply(null, args);
	}
  }
  
})();