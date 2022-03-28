module.exports = {
  regex: /{{\s?env:.*?}}/g,
  resolver: ({ match }) => {
    const directive = match.slice(2, -2).trim();
    const [, key] = directive.split(':');
    return process.env[key] || '';
  },
};
