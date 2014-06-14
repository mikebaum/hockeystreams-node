/**
 * Created by mike on 14-05-30.
 */

// Request types
const POST = "post";
const GET = "get";

var request = require('request');
var _ = require('underscore');
var f_utils = require( './function_utils.js' );

function doRequest( url, method, action, options, resultHandler ) {
    request[method](
        _.extend(
            {
                uri: url + action
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
 * @param {string} url - base url for "post" request
 * @param {string} action - name of the action to post
 * @param {Object} form - a properties object for the post
 * @param {function({})} [resultHandler] - a result handler that takes a JSON result.
 */
function doPost( url, action, form, resultHandler ) {
    doRequest( url, POST, action, { form: form }, resultHandler );
}

/**
 * Performs a get request
 * @param {string} url - base url for "get" request
 * @param {string} action - action to perform get request with
 * @param {Object} parameters - query string parameters
 * @param {function({})} [resultHandler] - a result handler that takes a JSON result.
 */
function doGet( url, action, parameters, resultHandler ) {
    doRequest( url, GET, action, { qs: parameters }, resultHandler );
}

function Requester( url )
{
    this.url = url;
    // immutable properties
//    Object.defineProperties( this, {
//        url: { get: function() { return url; } }
//    } );
}

Requester.prototype.post = function() {
    (f_utils.partial(doPost, this.url))( arguments );
};
Requester.prototype.get = function() {
    (f_utils.partial( doGet, this.url ))( arguments );
};

exports.doRequest = doRequest;
exports.doPost = doPost;
exports.doGet = doGet;

// exporting requester constructor
exports.Requester = Requester;
