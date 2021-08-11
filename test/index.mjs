import { test } from 'uvu';
import * as assert from 'uvu/assert';
import moduleRunner from '../dist/index.js'

const { default: execute } = moduleRunner;

const code = 'var nanoid = require("nanoid").nanoid; var x = { name: nanoid() }; exports.default = x;'

test('NanoID', () => {
  assert.is.not(execute(code), {});
  assert.is.not((execute(code)).name, null);
  assert.is.not((execute(code)).name, 0);
  assert.is.not((execute(code)).name, false);
  assert.is.not((execute(code)).name, '');
});

test.run();