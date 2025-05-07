// module.js

/**
 * Returns the sum of a and b.
 */
function sum(a, b) {
    return a + b;
  }
  
  /**
   * Returns a divided by b.
   */
  function div(a, b) {
    return a / b;
  }
  
  /**
   * Returns true if the string contains any digit 0–9.
   * Fixed implementation using a regex so that only actual digits match.
   */
  function containsNumbers(text) {
    return /\d/.test(text);
  }
  
  export default { sum, div, containsNumbers };
  