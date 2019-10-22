/**
 * Takes in a number and formats it with consistent price formatting.
 * @param {number} price
 * @param {boolean} showZero
 * @returns {string}
 */
export function formatPrice(price, showZero = true) {
    if (price !== 0 || showZero) {
        return "$" + (price / 100).toFixed(2);
    }
}
