/**
 * Created by mike on 14-05-30.
 */

// TODO: should this be a configurable parameter
const STREAM_COLUMNS = [ "event", "homeTeam", "homeScore", "awayTeam", "awayScore", "startTime", "period" ];

function buildColumns( object ) {
    var columns = [];
    for (var prop in object)
    {
        if( object.hasOwnProperty( prop ) && _.contains( STREAM_COLUMNS, prop ) )
            columns.push( { "data": prop, "title": prop.replace( /([A-Z])/g, ' $1').replace( /^./, function(str){ return str.toUpperCase(); } ) } );
    }

    return columns;
}

function getColumns( arrayOfObjects ) {
    var allColumns = _.map(arrayOfObjects, function( item ) { return buildColumns( item ); } );
    // need to validate that all the column sets are the same
    return allColumns[0];
}

function getStreams( url, userId ) {
    $.post( url, { userId: userId }, function( streams ) {

        var schedule = streams['schedule'];
        var columns = getColumns( schedule );

        console.log( "streams: " + JSON.stringify( schedule ) );
        $('#streams').dataTable( {
            "autoWidth": true,
            "data": schedule,
            "columns": columns
        } );
    })
}

function generateIpException( url, userId ) {
    $.post( url, { userId: userId } );
}