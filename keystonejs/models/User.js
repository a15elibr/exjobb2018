var keystone = require('keystone');
var Email = require('keystone-email');
var Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */
var User = new keystone.List('User');

User.add({
	name: { type: Types.Name, required: true, index: true },
	email: { type: Types.Email, initial: true, required: true, unique: true, index: true },
	password: { type: Types.Password, initial: true, required: true },
    username: { type: Types.Text, initial: true, required: false },
    wp_id: { type: Types.Number, unique: false, required: false },
    regDate: { type: Types.Date },
    group: { type: Types.Select, options: 'admin, teacher, student', default: 'student' },
}, 'Permissions', {
	isAdmin: { type: Boolean, label: 'Can access Keystone', index: true },
},  'Subdomain', {
    subname: { type: Types.Text, initial: true },
},  'Activation key', {
    activation_key: { type: String, initial: false, required: false },
    isKeyActive: { type: Boolean },
});

// Provide access to Keystone
User.schema.virtual('canAccessKeystone').get(function () {
	return this.isAdmin;
});

// -- Send email to a new user with activiation key 
User.schema.pre('save', function(next) {
    if(this.isKeyActive){
            new Email('./templates/emails/email.pug', {
            transport: 'mailgun',
        }).send({
            username: this.username,
            activation_key: this.activation_key,
        }, {
            apiKey: 'key-d94c30fc9c5bfa9a0a115c1e63fb2de0',
            domain: 'sandboxe93479b36ba5496bb2f1f69131955a2b.mailgun.org',
            to: this.email,
            from: {
                name: 'Your Site',
                email: 'hello@yoursite.com',
            },
            subject: 'Welcome to KeystoneJS',
        }, function (err, result) {
            if (err) {
                console.error('Mailgun test failed with error:\n', err);
            } else {
                console.log('Successfully sent Mailgun test with result:\n', result);
            }
        });
    }
    next();
});

/**
 * Relationships
 */
User.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });

/**
 * Registration
 */
User.defaultColumns = 'name, email, isAdmin';
User.register();
