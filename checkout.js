/* 
 *  checkout.js is used to instantiate supermarket.js 
 *  
 *  It is run from the terminal. 
 *  
 *  To run, type: 'node checkout <optional product string>'
 *  
 *  By default the script will initialize a Supermarket object
 *  populated with products and cart items as specified in the code-challenge.
 *  It will then run 'checkout' and print out the grand total of the cart.
 *
 *  Passing in the optional product string will replace the default cart with
 *  your custom string. Please use a series of A's, B's, and C's. 
 *  (i.e. node checkout 'BACCABACCABACCA')
*/

'use strict'

var Supermarket = require('./supermarket');
var myMarket = new Supermarket();
myMarket.init();
myMarket.checkout();
