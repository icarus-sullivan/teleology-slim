#!/usr/bin/env node
/* eslint-disable no-underscore-dangle */
import * as fs from 'fs';
import slim from './sync';

const RESERVED_OPTIONS_KEYWORD = '__options__';
const RESERVED_FILENAME_KEY = 'f';
const RESERVED_CONTEXT_KEY = 'i';

const args = process.argv.slice(2);

let key;
const options: { [key: string]: any } = {};
for (const arg of args) {
  // handle = assignment
  if (arg.includes('=')) {
    const [k, v] = arg.split('=');
    // @ts-ignore
    options[k.replace(/-/g, '')] = v;
    continue;
  }
  if (arg[0] === '-' || arg.slice(0, 2) === '-') {
    key = arg.replace(/-/g, '');
    // @ts-ignore
    options[key] = '';
    continue;
  }

  // @ts-ignore
  options[key] = options[key].length > 0 ? `${options[key]} ${arg}` : arg;
}

const processFile = (it: fs.PathLike) => {
  if (it && fs.existsSync(it)) {
    return fs.readFileSync(it, 'utf8');
  }

  throw new Error(`File ${it} does not exist`);
};

const processInputFile = (it: fs.PathLike) => {
  if (it && fs.existsSync(it)) {
    const contents = fs.readFileSync(it, 'utf8');
    return JSON.parse(contents);
  }

  return {};
};

if (options[RESERVED_FILENAME_KEY]) {
  const template = processFile(options[RESERVED_FILENAME_KEY]);

  const context =
    (options[RESERVED_CONTEXT_KEY] &&
      processInputFile(options[RESERVED_CONTEXT_KEY])) ||
    {};

  process.stdout.write(
    slim(template, {
      ...context,
      [RESERVED_OPTIONS_KEYWORD]: options,
    }),
  );
}
