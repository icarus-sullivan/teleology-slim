const resolver = require('./resolver');
const { env, opt, base } = require('./resolvers');

module.exports = resolver({
  resolvers: [env, opt, base],
});
