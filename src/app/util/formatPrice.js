// @flow

/**
 * Takes in a number and formats it with consistent price formatting.
 * @param {number} price
 * @param {boolean} showZero - Whether to show $0.00
 * @returns {string} Processed string.
 */
export function formatPrice(price: number, showZero = true): string {
  if (price !== 0 || showZero) {
    return "$" + (price / 100).toFixed(2);
  }
}
