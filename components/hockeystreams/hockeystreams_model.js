/**
 * Created by mike on 14-05-24.
 */
var Backbone = require( 'backbone' );

function HockeyStreamsModel()
{
    var UserModel = Backbone.Model.extend({});
    this.user = new UserModel(); // TODO: this is temporary, don't expose like this
}

module.exports = HockeyStreamsModel;