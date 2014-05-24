/**
 * Created by mike on 14-05-18.
 */

var express = require('express');

var app = module.exports = express();

app.set( 'views', __dirname );

var actions = require('../hockeystreams/hockeystreams-actions.js');

var model = new (require('../hockeystreams/hockeystreams_model.js' ))();
var userModel = model.user;

userModel.on( "change:status", function() {
    console.log( "User model updated: " + userModel.toString() )
} );


/* Render hockeystreams login page */
app.get( '/hockeystreams', function( req, res ) {
    res.render( 'login', { title: 'Hockeystreams' } );
} );

/* Login to hockeystreams */
app.post('/hockeystreams/login', function ( req, res ) {
    actions.login( req.body.username, req.body.password, function( userData ) {
        userModel.set( userData );
        //res.send('login successful');
        res.render( 'hockeystreams-api' );
    } );
} );

// TODO: the session token should be given to the client
app.post( '/hockeystreams/ipexception', function( req, res ) {
    actions.ipException( userModel.get( "token" ),
                         function() {
                             console.log( "ip exception generated" )
                         } );
    res.send( "ip exception, boo, ya" );
} );

module.exports = app;

