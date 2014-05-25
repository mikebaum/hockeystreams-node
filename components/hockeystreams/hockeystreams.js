/**
 * Created by mike on 14-05-18.
 */

var express = require('express');
var actions = require('../hockeystreams/hockeystreams-actions.js');
var model = new (require('../hockeystreams/hockeystreams_model.js' ))();
var app = module.exports = express();

app.use( express.static('../../node_modules') );
app.set( 'views', __dirname );
app.set( 'view engine', 'jade' );

//userModel.on( "change:status", function() {
//    console.log( "User model updated: " + userModel.toString() )
//} );


/* Render hockeystreams login page */
app.get( '/hockeystreams', function( req, res ) {
    res.render( 'login', { title: 'Hockeystreams' } );
} );

/* Login to hockeystreams */
app.post('/hockeystreams/login', function ( req, res ) {
    actions.login( req.body.username, req.body.password, function( userData ) {
        var id = model.addUser( userData );
        var user = model.getUser( id );
        res.render( 'hockeystreams-api', { userId: id } );

        console.log( "user login id: " + user );
    } );
} );

// TODO: the session token should be given to the client
app.post( '/hockeystreams/ipexception', function( req, res ) {
    var user = model.getUser( req.body.userId );
    actions.ipException( user.get( "token" ),
                         function() { console.log( "ip exception generated" ) } );
    res.send( "ip exception, boo, ya" );
} );

app.post( '/hockeystreams/getstreams', function( req, res ) {
    var user = model.getUser( req.body.userId );
    actions.getStreams( user.get( "token" ), function() {
        console.log( "get streams finished" );
    } );
    //res.end( 'got streams' );
    res.render( 'hockeystreams-api', { userId: user.id } );
} );
