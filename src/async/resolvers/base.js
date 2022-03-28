const { Buffer } = require('buffer/');

const base64 = (v) => Buffer.from(v).toString('base64').replace(/=/g, '');

/* eslint-disable no-new-func */
const compile = (cmd, context) =>
  new Promise((resolve) => {
    const hash = base64(cmd);
    context[hash] = resolve;
    new Function(`with(this) {
      try {
        Promise.resolve(${cmd})
          .then((result) => {
            if (typeof result === 'number') return ${hash}(result);
            ${hash}(result || '');
          })
      } catch (e) {
        ${hash}('')
      }
  }`).apply(context);
  });

module.exports = {
  regex: /{{.*?}}/g,
  resolver: async ({ match, context }) => {
    const key = match.slice(2, -2).trim();
    const value = context[key];
    if (typeof value === 'number') return value;
    return value && typeof value === 'function'
      ? value(context)
      : compile(key, context);
  },
};
