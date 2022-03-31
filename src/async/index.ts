import { env, opt, base } from './resolvers';

const resolvers = [env, opt, base];

const asyncReplace = async (str: string, search: (string | RegExp), replacer?: Function): Promise<string> => {
  if (typeof replacer === 'function') {
    const promises: Promise<string>[] = [];
    // @ts-ignore
    str.replace(search, (...args) => {
      promises.push(replacer(...args));
    });

    const resolved = await Promise.all(promises);
    // @ts-ignore
    return str.replace(search, () => resolved.shift());
  }

  // @ts-ignore
  return str.replace(search, replacer);
};

export default async (template: string, context: any): Promise<string> => {
  let src = template;

  for (const { resolver, regex } of resolvers) {
    // eslint-disable-next-line no-await-in-loop
    src = await asyncReplace(src, regex, async (match: string) =>
      resolver({ match, context }),
    );
  }

  return src;
};