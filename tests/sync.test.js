const { slim } = require('../src');

const context = {
  location: () => 'world',
  what: 'slim',
};

const template = `
hello {{ location }}

this is a test script for {{ what }}`;

test('Template is created', () => {
  const result = slim(template, context);
  expect(result).toMatchSnapshot();
});
