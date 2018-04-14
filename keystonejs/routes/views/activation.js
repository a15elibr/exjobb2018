var keystone = require('keystone');
var User = keystone.list('User');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = '';
    locals.formData = req.body || {};
    
    view.on('get', function(next) {
        next();
    });
    
    view.on('post', function (next) {
        
        var key = locals.formData.key;
        User.model.findOne({ activation_key: key}, function(findError, user) {
            if (findError) {
                // handle error
                console.log("didnt find user");
            } else {
                console.log("found user");
                user.password = locals.formData.password;
                user.isKeyActive = false;
                user.save(function(saveError) {
                    if (saveError) {
                        // handle error
                        console.log("couldnt save password");
                    } else {
                        console.log("password saved");
                    }
                });
            }
        });
        next();
	});
    
	// Render the view
	view.render('activation');
};
