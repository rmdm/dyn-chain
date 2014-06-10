module.exports = (function(){

  var _deps = {};
  var _acts = {};

  function injection(deps){
    var acts = [];
    deps.forEach(function(dep){
      acts.push(function(){
        return _acts[dep].apply(null, arguments);
      });
    });
    return acts;
  }

  function define(step, deps, wrapped){
    _deps[step] = deps;
    _acts[step] = wrapped.apply(null, injection(deps));
  }

  function remove(step){
    delete _deps[step];
    delete _acts[step];
  }

  function exec(step, args){
    if(_acts[step]){
      return _acts[step].apply(null, args);
    }
  }

  return {
    define: define,
    remove: remove,
    exec: exec
  };

})();