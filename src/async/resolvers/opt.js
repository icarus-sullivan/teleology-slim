const RESERVED_OPTIONS_KEYWORD = '__options__';

module.exports = {
  regex: /{{\s?opt:.*?}}/g,
  resolver: ({ match, context }) => {
    const opt = context[RESERVED_OPTIONS_KEYWORD] || {};
    const directive = match.slice(2, -2).trim();
    const [, key] = directive.split(':');
    return opt[key] || '';
  },
};
