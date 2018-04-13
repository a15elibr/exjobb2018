var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Page Model
 * ==========
 */
var Page = new keystone.List('Page', {
	map: { name: 'path' },
	autokey: { path: 'slug', from: 'path', unique: true },
});

Page.add({
	path: { type: String, initial: true, required: true, index: true, unique: true },
	page: { type: Types.Text, initial: true, required: true, index: true },
    template: { type: String, initial: true, required: false },
});

/**
 * Registration
 */
Page.defaultColumns = 'path, page';
Page.register();
