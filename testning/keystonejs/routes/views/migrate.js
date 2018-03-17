var keystone = require('keystone');
var user = keystone.list('users');
var type = keystone.Field.Types;

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'migrate';
    
    // try to add some users
    keystone.createItems({
        User: [
            { 
                name: {
                first: 'elin',
                last: 'brown'
                } 
            },
            {
                email: 'Jo',
                userName: 'more@valid.string',
                regDate: '2016-03-15',
                password: 'hashme',
                isAdmin: false,
            },
        ]},
        { verbose: true}, function (err, stats) {
        if (err) throw new Error('panic!', err);
        console.log('our results', stats);
    });

	view.render('migrate');
};