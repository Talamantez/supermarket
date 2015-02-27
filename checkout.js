/* 
 *  checkout.js is run with Node. 
 *  Usage: node checkout <optional product string>
 *  By default, it will initialize a Supermarket object,
 *  its products and cart items as specified in the code-challenge,
 *  then run 'checkout' and return the total cost of the cart.
 *
 *  The optional product string should be a series of capital A's,
 *  B's and C's. (i.e. 'AAABBBCCC' or 'CCCCBAABA')
*/

'use strict'

var Supermarket = require('./supermarket');
var myMarket = new Supermarket();
myMarket.init();
myMarket.checkout();
