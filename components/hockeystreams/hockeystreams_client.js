/**
 * Created by mike on 14-05-30.
 */

function generateIpException( url, userId ) {
    $.post( url, userId );
}

function getStreams( url, userId ) {
    $.post( url, userId, function( streams ) {
        console.log( "streams: " + JSON.stringify( streams ) );
    })
}