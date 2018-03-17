var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Subdomain model
 * ==========
 */

var Subdomain = new keystone.List('Subdomain', {
	map: { name: 'username' },
	autokey: { path: 'slug', from: 'username', unique: true },
});

Subdomain.add({
    username: { type: Types.Relationship, ref: 'User', index: true, required: true, filters: { group: 'student' } },
    name: { type: Types.Text, initial: true, default: 'username' },
});

Subdomain.defaultColumns = 'username, name';
Subdomain.register();
