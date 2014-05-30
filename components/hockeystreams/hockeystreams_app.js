/**
 * Created by mike on 14-05-18.
 */

const LOGIN_PATH = '/hockeystreams/login';
const IP_EXCEPTION_PATH = '/hockeystreams/ipexception';
const GET_STREAMS_PATH = '/hockeystreams/getstreams';

var express = require('express');
var actions = require('../hockeystreams/hockeystreams_actions.js');
var model = new (require('../hockeystreams/hockeystreams_model.js' ))();
var app = module.exports = express();

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
app.post( LOGIN_PATH, function ( req, res ) {
    actions.login( req.body.username, req.body.password, function( userData ) {
        var id = model.addUser( userData );
        var user = model.getUser( id );
        const host = req.get('host');
        res.render( 'hockeystreams-api', { userId: id,
                                           ipExceptionUrl: 'http://' + host + IP_EXCEPTION_PATH,
                                           getStreamsUrl: 'http://' + host + GET_STREAMS_PATH } );

        console.log( "user login id: " + user );
    } );
} );

app.post( IP_EXCEPTION_PATH, function( req, res ) {
    var user = model.getUser( req.body.userId );
    actions.ipException( user.get( "token" ),
                         function() { console.log( "ip exception generated" ) } );
    res.send( "ip exception, boo, ya" );
} );

app.post( GET_STREAMS_PATH, function( req, res ) {
    var user = model.getUser( req.body.userId );
    actions.getStreams( user.get( "token" ), function( streams ) {
        res.json( streams );
        console.log( "get streams finished" );
    } );
} );
