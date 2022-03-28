const asyncReplace = async (str, search, replacer) => {
  if (typeof replacer === 'function') {
    const promises = [];
    str.replace(search, (...args) => {
      promises.push(replacer(...args));
    });

    const resolved = await Promise.all(promises);
    return str.replace(search, () => resolved.shift());
  }

  return str.replace(search, replacer);
};

module.exports = ({ resolvers = [] }) => async (template, context) => {
  let src = template;

  for (const { resolver, regex } of resolvers) {
    // eslint-disable-next-line no-await-in-loop
    src = await asyncReplace(src, regex, async (match) =>
      resolver({ match, context }),
    );
  }

  return src;
};
