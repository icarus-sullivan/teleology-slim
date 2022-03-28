module.exports = ({ resolvers = [] }) => (template, context) => {
  return resolvers.reduce((src, { resolver, regex }) => {
    return src.replace(regex, (match) => {
      const result = resolver({
        match,
        context,
      });

      return result;
    });
  }, template);
};
