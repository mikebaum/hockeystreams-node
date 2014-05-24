/**
 * Created by mike on 14-05-24.
 */
var Backbone = require( 'backbone' );

var UserModel = Backbone.Model.extend({
    idAttribute: "uid"
});

function HockeyStreamsModel()
{
    this.users = new Backbone.Collection([], {
        model: UserModel
    });

    console.log( "users: " + this.users );
}

HockeyStreamsModel.prototype.addUser = function( userJSON )
{
    var user = new UserModel( userJSON );
    this.users.add( user );
    return user.id;
};

HockeyStreamsModel.prototype.getUser = function( id )
{
    return this.users.get( id );
};

module.exports = HockeyStreamsModel;

//var hockeystreamsModel = new HockeyStreamsModel();
//
//exports.addUser = hockeystreamsModel.addUser;
//exports.getUser = hockeystreamsModel.getUser;