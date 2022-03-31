/* eslint-disable no-new-func */
const compile = (cmd: string) =>
  new Function(`with(this) {
  try {
    const result = ${cmd};
    if (typeof result === 'number') return result;
    return result || '';
  } catch (e) {
    return '';
  }
}`);

export default {
  regex: /{{.*?}}/g,
  resolver: ({ match, context }: ResolverArgs) => {
    const key = match.slice(2, -2).trim();
    const value = context[key];
    if (typeof value === 'number') return value;
    return value && typeof value === 'function'
      ? value(context)
      : compile(key).apply(context);
  },
};
