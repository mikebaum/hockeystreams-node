
// ACTIONS
const LOGIN_ACTION = 'Login';
const IP_EXCEPTION = 'IPException';
const GET_STREAMS = 'GetLive';

// Request types
const POST = "post";
const GET = "get";

var request = require('request');
var _ = require('underscore');

function doRequest( method, action, options, resultHandler ) {
    request[method](
        _.extend(
        {
            uri: "https://api.hockeystreams.com/" + action
        }, options ),
        function (error, response, body) {
            if (error)
                console.log("Error: " + error);

            if (response) {
                console.log('STATUS: ' + response.statusCode);
                console.log('HEADERS: ' + JSON.stringify(response.headers));
            }

            if (body) {
                var result = JSON.parse( body );

                if (resultHandler)
                    resultHandler(result);
            }
        });
}
/**
 * Performs a post request
 * @param {string} action - name of the action to post
 * @param {Object} form - a properties object for the post
 * @param {function({})} [resultHandler] - a result handler that takes a JSON result.
 */
function doPost( action, form, resultHandler ) {
    doRequest( POST, action, { form: form }, resultHandler );
}

/**
 * Performs a get request
 * @param {string} action - action to perform get request with
 * @param {Object} parameters - query string parameters
 * @param {function({})} [resultHandler] - a result handler that takes a JSON result.
 */
function doGet( action, parameters, resultHandler ) {
    doRequest( GET, action, { qs: parameters }, resultHandler );
}
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

    doPost( LOGIN_ACTION, loginForm, resultHandler );
}

/**
 * Generates an IP Exception valid for 4 hours
 * @param {string} token - session token from User.token
 * @param {function({})} [resultHandler] - a function that accepts a JSON result object
 */
function ipException( token, resultHandler )
{
    doPost( IP_EXCEPTION, { token: token }, resultHandler );
}

function getStreams( token, resultHandler )
{
    doGet( GET_STREAMS, { token: token }, resultHandler );
}

exports.login = login;
exports.ipException = ipException;
exports.getStreams = getStreams;
