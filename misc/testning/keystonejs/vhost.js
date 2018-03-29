var path = require('path'),
    evh = require('express-vhost'),
    express = require('express'),
    server = express();
    
/**
* express-vhost
**/
server.use(evh.vhost(server.enabled('trust proxy')));
server.listen(3000); //port 3000

require('dotenv').config();

var keystone = require('keystone');

keystone.init({
	//Its configuration. "Host" and "port" does not work here
});

keystone.import('models');

keystone.set('locals', {
	_: require('lodash'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable
});

keystone.set('routes', require('./routes'));

keystone.set('nav', {
	//nav setup ...
});

/**
keystone.mount () will prepare everything to start the keystone. This is very important!
**/
keystone.mount();

evh.register('*.mydomain.com', keystone.app); //registers the keystone in the defined field