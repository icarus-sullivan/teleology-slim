/* eslint-disable no-new-func */
const compile = (cmd) =>
  new Function(`with(this) {
  try {
    return ${cmd} || '';
  } catch (e) {
    return '';
  }
}`);

module.exports = {
  regex: /{{.*?}}/g,
  resolver: ({ match, context }) => {
    const directive = match.slice(2, -2).trim();
    const value = context[match];
    return value && typeof value === 'function'
      ? value(context)
      : compile(directive).apply(context);
  },
};
