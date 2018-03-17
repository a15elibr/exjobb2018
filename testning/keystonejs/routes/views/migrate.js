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
        name: { first:'elin', last:'brown' },
        email: 'a15elibr@student.his.se',
        password: 'elinis',
        isAdmin: false,
        username: 'a15elibr',
        regdate: 2015-16-04
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