const assert = require('node:assert');
const { test } = require('node:test');
const { sub } = require('../src/sub.js');

test('subtracts two numbers (UC-1, ADR 0001)', () => {
  assert.strictEqual(sub(5, 3), 2);
});
