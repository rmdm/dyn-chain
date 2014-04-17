module.exports = (function(){
  
  var _deps = {};
  var _acts = {};
  var _objs = {};
  
  function Injector(deps){
    var acts = [];
    deps.forEach(function(dep){
      acts.push(function(){
        return _acts[dep].apply(_objs[dep], arguments);
      });
    });
    return acts;
  }
  
  function define(step, deps, wrap, obj){
    if(!_deps[step]){
    _deps[step] = deps;
    _acts[step] = wrap.apply(null, Injector(deps));
    _objs[step] = obj || null;
    }
  }
  
  function redefine(step, wrap, obj){
    if(_deps[step]){
      _acts[step] = wrap.apply(null, Injector(_deps[step]));
      _objs[step] = obj || null;
    }
  }
  
  function remove(step){
    delete _deps[step];
    delete _acts[step];
    delete _objs[step];
  }
  
  function exec(step, args){
    if(_acts[step]){
      return _acts[step].apply(_objs[step], args);
    }
  }
  
  return {
    define: define,
    redefine: redefine,
    remove: remove,
    exec: exec
  };
  
})();