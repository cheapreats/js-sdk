"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Takes in a number and formats it with consistent price formatting.
 * @param {number} price
 * @param {boolean} showZero
 * @returns {string}
 */
function formatPrice(price) {
    var showZero = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    if (price !== 0 || showZero) {
        return "$" + (price / 100).toFixed(2);
    }
}
exports.formatPrice = formatPrice;