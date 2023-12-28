// Import 'koa' instead of specific entities (Context, Next)
const node = require("node");

// Destructure properties from koa
const { Context } = node;

// Middleware function
const checkAuthorization = async (ctx, next) => {
  const isAuthenticated = ctx.session && ctx.session.userId;
  if (isAuthenticated) {
    await next();
  } else {
    ctx.redirect('/login');
  }
};

// Export the middleware function
module.exports = checkAuthorization;
