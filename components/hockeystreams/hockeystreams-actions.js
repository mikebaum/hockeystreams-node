
// ACTIONS
const LOGIN_ACTION = 'Login';
const IP_EXCEPTION = 'IPException';

var request = require('request');

/**
 * Performs a post request
 * @param {string} action - name of the action to post
 * @param {Object} form - a properties object for the post
 * @param {function({})} [resultHandler] - a result handler that takes a JSON result.
 */
function doPost( action, form, resultHandler ) {
    request.post(
    {
        uri: "https://api.hockeystreams.com/" + action,
        form: form
    },
    function (error, response, body)
    {
        if ( error )
            console.log("Error: " + error);

        if ( response ) {
            console.log('STATUS: ' + response.statusCode);
            console.log('HEADERS: ' + JSON.stringify(response.headers));
        }

        if ( body )
        {
            var result = JSON.parse(body);

            if (resultHandler)
                resultHandler(result);
        }
    });
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
 * Generates an IP Excpetion valid for 4 hours
 * @param {string} token - session token from User.token
 * @param {function({})} [resultHandler] - a function that accepts a JSON result object
 */
function ipException( token, resultHandler )
{
    doPost( IP_EXCEPTION, { token: token }, resultHandler );
}

exports.login = login;
exports.ipException = ipException;
