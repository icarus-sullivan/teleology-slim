const { slimAsync } = require('../src');

jest.setTimeout(15000);

const context = {
  location: async () => Promise.resolve('world'),
  what: 'slim',
};

const template = `
hello {{ location }}

this is a test script for {{ what }}`;

test('Async template is created', async () => {
  const result = await slimAsync(template, context);
  expect(result).toMatchSnapshot();
});

test('Missing value does not cause issues', async () => {
  const result = await slimAsync(template, {});
  expect(result).toMatchSnapshot();
});
