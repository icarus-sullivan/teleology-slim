import { env, opt, base } from './resolvers';

const resolvers = [env, opt, base];

export default (template: string, context: any): string => {
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

