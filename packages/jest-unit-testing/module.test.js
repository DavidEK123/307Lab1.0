// module.test.js
import mut from './module.js';

describe('sum()', () => {
  test('adds two positive integers', () => {
    expect(mut.sum(12, 18)).toBe(30);
  });

  test('works with negative numbers', () => {
    expect(mut.sum(-5, 5)).toBe(0);
  });

  test('works with floats (use toBeCloseTo for precision)', () => {
    expect(mut.sum(0.1, 0.2)).toBeCloseTo(0.3, 5);
  });
});

describe('div()', () => {
  test('divides two positive integers', () => {
    expect(mut.div(10, 2)).toBe(5);
  });

  test('division by zero gives Infinity', () => {
    expect(mut.div(1, 0)).toBe(Infinity);
  });

  test('zero divided by anything is zero', () => {
    expect(mut.div(0, 42)).toBe(0);
  });

  test('handles negative divisor', () => {
    expect(mut.div(10, -2)).toBe(-5);
  });

  test('handles floats', () => {
    expect(mut.div(1.5, 0.5)).toBe(3);
  });

  test('non-numeric arguments produce NaN', () => {
    expect(Number.isNaN(mut.div('foo', 3))).toBe(true);
  });
});

describe('containsNumbers()', () => {
  test('detects digits in the middle of text', () => {
    expect(mut.containsNumbers('hello2world')).toBe(true);
  });

  test('detects digits at start and end', () => {
    expect(mut.containsNumbers('1abc')).toBe(true);
    expect(mut.containsNumbers('abc9')).toBe(true);
  });

  test('returns false if no digits present', () => {
    expect(mut.containsNumbers('just letters')).toBe(false);
  });

  test('returns false on empty string', () => {
    expect(mut.containsNumbers('')).toBe(false);
  });

  // These two tests will fail with the buggy implementation:
  test('does not count spaces as digits', () => {
    expect(mut.containsNumbers('   ')).toBe(false);
  });

  test('does not count punctuation as digits', () => {
    expect(mut.containsNumbers('!?,-')).toBe(false);
  });
});
