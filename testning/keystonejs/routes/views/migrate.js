var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'migrate';
    
    // try to add some users
    var User = keystone.list('User').model;

    var user = new User({
        name: { first:'Abcd', last:'xyz' },
        email: 'abc@xyz.com',
        password: 'password',
        isAdmin: false
    });

    user.save(function (err) {
        if (err) {
            // handle error
            return console.log(err);
        }

        // user has been saved
        console.log(user);
    });

	view.render('migrate');
};