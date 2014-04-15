describe('Dynamic chain', function(){
 
  var chain = require('../lib/dyn-chain');
  
  chain.define('b', ['a'], function(a){
    return function(){
	  return a() + 4;
	};
  });
  
  chain.define('a', [], function(){
    return function(){
	  return 5;
	};
  });

  it('exec() should execute define()-d functions in chain. They can be define()-d independently from each other', function(){
    expect(chain.exec('b')).toEqual(9);
  });
  
  chain.redefine('b', function(a){
    return function(){
	  return a() * 4;
	};
  });
  
  it('exec() still should return expected results after we redefine() functions', function(){
    expect(chain.exec('b')).toEqual(20);
  });
  
  chain.redefine('a', function(){
    return function(){
	  return 10;
	};
  });
  
  it('And even more redefine().', function(){
    expect(chain.exec('b')).toEqual(40);
  });
  
  it('We able to call different members of the chain', function(){
    expect(chain.exec('a')).toEqual(10);
  });
  
  chain.remove('a');
  
  it('Should throw error when we delete some dependents from the chain', function(){
    expect(chain.exec('b')).toThrow();
	expect(chian.exec('a')).toThrow();
  });
  
});