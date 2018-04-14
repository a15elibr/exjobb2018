var keystone = require('keystone');
var User = keystone.list('User');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'user';
    locals.formData = req.body || {};
    locals.passwordSubmitted = false;
    
    view.on('post', function (next) {

        User.model.findOne({ _id: req.user._id}, function(findError, user) {
            if (findError) {
                // handle error
                console.log("didnt find user");
            } else {
                console.log("found user");
                user.password = locals.formData.password;
                user.save(function(saveError) {
                    if (saveError) {
                        // handle error
                        console.log("couldnt save password");
                    } else {
                        console.log("password saved");
                        locals.passwordSubmitted = true;
                    }
                });
            }
        });
        next();
        
	});


	// Render the view
	view.render('user');
};
