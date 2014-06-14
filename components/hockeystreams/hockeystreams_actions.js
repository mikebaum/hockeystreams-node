
// ACTIONS
const LOGIN_ACTION = 'Login';
const IP_EXCEPTION = 'IPException';
const GET_STREAMS = 'GetLive';
const URL = "https://api.hockeystreams.com/";

const REQUESTER = new (require( '../../lib/requests.js' )).Requester( URL );

/**
 * Logs into hockeystreams
 * @param {string} username
 * @param {string}  password
 * @param {function({})} [resultHandler] - a function that accepts a JSON result object
 * from the login call.
 */
function login( username, password, resultHandler )
{
    var loginForm = {
        'username': username,
        'password': password,
        'key': '1dd7bceb51c69ba4190a5be6d59ee41e'
    };

    REQUESTER.post( LOGIN_ACTION, loginForm, resultHandler );
}

/**
 * Generates an IP Exception valid for 4 hours
 * @param {string} token - session token from User.token
 * @param {function({})} [resultHandler] - a function that accepts a JSON result object
 */
function ipException( token, resultHandler )
{
    REQUESTER.post( IP_EXCEPTION, { token: token }, resultHandler );
}

function getStreams( token, resultHandler )
{
    REQUESTER.get( GET_STREAMS, { token: token }, resultHandler );
}

exports.login = login;
exports.ipException = ipException;
exports.getStreams = getStreams;
