var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Elin Model
 * ==========
 */

var Elin = new keystone.List('Elin');

Elin.add({
	title: { type: String, required: true, index: true, initial: true },
    color: { type: String, initial: true },
});


Elin.defaultColumns = 'title, color';
Elin.register();
