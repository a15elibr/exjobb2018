var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Subdomain model
 * =============
 */

var Subdomain = new keystone.List('Subdomain', {
    autokey: { path: 'slug', from: 'name', unique: true },
});

Subdomain.add({
	name: { type: String, required: true, initial: true, index: true },
    text: { type: Types.Text, initial: true },
    username: { type: Types.Relationship, ref: 'User', many: false },
});

Subdomain.register();
