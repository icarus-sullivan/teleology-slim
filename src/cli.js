#!/usr/bin/env node
/* eslint-disable no-underscore-dangle */

const fs = require('fs');
const slim = require('./index');

const RESERVED_OPTIONS_KEYWORD = '__options__';
const RESERVED_FILENAME_KEY = 'f';
const RESERVED_CONTEXT_KEY = 'i';

const args = process.argv.slice(2);

const options = args.reduce(
  (a, b) => {
    if (b[0] === '-' || b.slice(0, 2) === '-') {
      return {
        ...a,
        _l: b.replace(/-/g, ''),
      };
    }
    if (a._l) {
      return {
        ...a,
        [a._l]: b,
        _l: undefined,
      };
    }

    return a;
  },
  {
    _l: undefined,
  },
);

const processFile = (it, optional) => {
  if (it && fs.existsSync(it)) {
    return fs.readFileSync(it, 'utf8');
  }

  if (optional) return;

  throw new Error(`File ${it} does not exist`);
};

const input = processFile(options[RESERVED_OPTIONS_KEYWORD], true) || {};
if (options[RESERVED_FILENAME_KEY]) {
  const template = processFile(options[RESERVED_FILENAME_KEY]);

  console.log(
    slim(template, {
      [RESERVED_OPTIONS_KEYWORD]: options,
      ...input,
    }),
  );
}
