const { slimAsync } = require('../src');

const snippet = async (num) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`You passed ${num}`);
    }, 300);
  });
};

const context = {
  snippet,
  simple: 'simple man',
};

const template = `
hello world

{{ snippet(123) }}

{{ simple }}

... goodbye`;

(async () => {
  try {
    const result = await slimAsync(template, context);

    console.log('result', result);
  } catch (e) {
    console.log('err', e);
  }
})();
