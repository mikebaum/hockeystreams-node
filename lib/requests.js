/**
 * Created by mike on 14-05-30.
 */

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

exports.doRequest = doRequest;
exports.doPost = doPost;
exports.doGet = doGet;
