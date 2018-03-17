var keystone = require('keystone');
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
    username: { type: Types.Text, required: false, initial: true, unique: false },
    regdate: { type: Types.Date, required: false, initial: true },
    group: { type: Types.Select, options: 'admin, teacher, student', default: 'student' }
}, 'Permissions', {
	isAdmin: { type: Boolean, label: 'Can access Keystone', index: true },
});

// Provide access to Keystone
User.schema.virtual('canAccessKeystone').get(function () {
	return this.isAdmin;
});


/**
 * Relationships
 */
User.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });
User.relationship({ ref: 'Subdomain', refPath: 'username' });

/**
 * Registration
 */

// bugfix ? 
// exports = module.exports = User;

User.defaultColumns = 'name, email, isAdmin, username, regdate';
User.register();
