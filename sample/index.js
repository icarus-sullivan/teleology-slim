const fs = require('fs');
const path = require('path');
const slim = require('../lib');

const ENTRY_FILE = path.resolve(__dirname, 'input.slim');
const OUTPUT_FILE = path.resolve(__dirname, 'output.txt');

const template = fs.readFileSync(ENTRY_FILE, 'utf8');

const output = slim(template, {
  user: {
    name: 'Bill & Ted',
    lastVisited: Date.now(),
  },
  formatDate: (d) => new Date(d).toLocaleTimeString(),
  survey: [
    'How was your stay?',
    'How was the response of the staff?',
    'Would you suggest our services to your friends?',
    'If you could improve one thing, what would it be?',
  ],
});

fs.writeFileSync(OUTPUT_FILE, output, 'utf8');
