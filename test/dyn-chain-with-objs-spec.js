describe('Dynamic chain', function(){
  
  var chain = require('../lib/dyn-chain');
  
  beforeEach(function(){    
    function A(){
      this.a = "a";
    }
    
    A.prototype.fa = function(){
      return this.a;
    };
    
    function B(){
      this.b = "b";
    }
    
    B.prototype.fb = function(a){
      return this.b + a();
    };
    
    var oa = new A();
    var ob = new B();
    
    chain.define('a', [], function(){return oa.fa;}, oa);	
    
    chain.define('b', ['a'], function(a){
      return function(){
        return ob.fb(a);
      };
    }, ob);  
  });
  
  afterEach(function(){
    chain.remove('a');
    chain.remove('b');
  });
  
  it('should work with functions that have "this" in them', function(){
    expect(chain.exec('a')).toEqual('a');
    expect(chain.exec('b')).toEqual('ba');
  });  
  
});