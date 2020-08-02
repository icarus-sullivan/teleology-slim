/* eslint-disable no-new-func */
const INTERPOLATED = /{{.*?}}/g;

const compile = (cmd) =>
  new Function(`with(this) {
  try {
    return ${cmd} || '';
  } catch (e) {
    return '';
  }
}`);

module.exports = (template, context) =>
  template.replace(INTERPOLATED, (found) => {
    const cleaned = found.slice(2, -2).trim();
    const exists = context[cleaned];
    return exists && typeof exists === 'function'
      ? exists(context)
      : compile(cleaned).apply(context);
  });
