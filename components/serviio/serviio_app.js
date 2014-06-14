
const LIBRAY_PATH = '/serviio/library';

var express = require('express');
//var actions = require('../hockeystreams/hockeystreams_actions.js');
//var model = new (require('../hockeystreams/hockeystreams_model.js' ))();

var path = require('path');
var app = module.exports = express();

var client = path.join(__dirname, 'client');
app.use(express.static(client));

app.set( 'views', client );
app.set( 'view engine', 'jade' );

//app.get( LIBRAY_PATH, function( req, res ) {
//    res.render( 'login', { title: 'Hockeystreams' } );
//} );
