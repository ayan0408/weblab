const { Session } = require('koa-session');
const { User } = require('./User'); // Adjust the path based on your project structure

// Manually attach properties to the Session prototype
Session.prototype.user = undefined;
Session.prototype.userId = undefined;
