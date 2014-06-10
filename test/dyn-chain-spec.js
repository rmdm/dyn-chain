describe('Dynamic chain', function(){

  var chain = require('../lib/dyn-chain');

  beforeEach(function(){
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
  });

  afterEach(function(){
    chain.remove('a');
    chain.remove('b');
  });

  it('exec() should execute define()-d functions in chain. They can be define()-d independently from each other', function(){
    expect(chain.exec('b')).toEqual(9);
  });

  it('We able to call different members of the chain', function(){
    expect(chain.exec('a')).toEqual(5);
  });

  it('exec() still should return expected results after we redefine functions', function(){
    chain.define('b', ['a'], function(a){
      return function(){
        return a() * 4;
      };
    });
    expect(chain.exec('b')).toEqual(20);
  });

  it('And even more redefine().', function(){
    chain.define('b', ['a'], function(a){
        return function(){
          return a() * 4;
        };
    });
    chain.define('a', [], function(){
        return function(){
          return 10;
        };
    });
    expect(chain.exec('b')).toEqual(40);
  });

  it('Should throw error when we delete some dependents from the chain', function(){
    chain.remove('a');
    expect(function(){chain.exec('b');}).toThrow();
    expect(function(){chian.exec('a');}).toThrow();
  });

});