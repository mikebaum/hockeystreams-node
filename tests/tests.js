/**
 * Created by mike on 14-05-16.
 */


var should = require('should');
var assert = require('assert');

describe ( 'Test Framework', function(){
    it ('should have mocha installed and running', function(){
        assert.equal (true, true);
    });
    it ('should have the should library installed and running for fluent testing', function(){
        true.should.eql (true);
    })
});

describe ( 'Asynchronous testing', function(){
    var result = false;

    beforeEach ( function( done ) {
        setTimeout ( function() {
            result = true;
            done();
        })
    }, 2000 );

    it ( 'it should NOT be hard to do but this makes it easier', function( done ) {
        result.should.eql( true );
        done();
    } )

} );