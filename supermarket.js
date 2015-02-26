'use strict'

/* 

supermarket.js exports a Supermarket object 

List of Properties:
    
    cart: A String wherein each char is the name of a product
    products: A list of product objects that correspond to the chars in the cart string

List of Methods:

    checkout(): Counts up products, sums their prices, applies discounts, and returns a Total
    countProduct(): Count up instances of a product 
    applyDiscount(): Applies discount to a total
    
    initCart(): Initialize cart as the String 'ABBACBBAB'
    Product(): Product constructor
*/

var _ = require('./underscore');

var Supermarket = function(){
    this.cart = '';
    this.Product = function( name, price, discountThresh, discountAmt ){
        this.name = name;
        this.price = price;
        this.discountThresh = discountThresh;
        this.discountAmt = discountAmt;
        console.log('\nCreated new Product: ');
        console.dir( this );
    }
    this.products = [];

    this.checkout = function( items ){

        // Allow access to 'this' from local scope
        var that = this;
        // Initialize total
        var total = 0;
        // Loop over products array
        _.each( that.products, function( product ){
            console.log('\nsumming '+ product.name + ' products');
            // Count instances of product in input string
            var numItems = that.countProduct( product.name );
            
            /* 
            Multiply the product's price by count of instances
            and add it to the total
            */

            total += numItems * product.price;
            console.log('total: ' + total);          
            /* 
            If a product has discount data and the count of instances 
            of the item is greaterthan its discount threshold, 
            count up the number of discounts and apply them to the total
            */
            if(product.discountThresh && product.discountAmt){
                if( numItems/product.discountThresh >= 1){
                    var numDiscounts = Math.floor( numItems/product.discountThresh );
                    total = that.applyDiscount( total, product.discountAmt , numDiscounts );
                    console.log('discount applied: ' + total);
                }
            }
        });
    
        // return the total cost for the cart
        return total;
  }

    this.countProduct = function( productName ){

        // Split the input string into an array
        var itemsArray = this.cart.split('');

        // Filter based on product name
        var filteredArray = _.filter( this.cart , function(char){ return char === productName});
        
        // Return the length of the array
        return( filteredArray.length );
    }

    this.applyDiscount = function( total , discountAmt , numDiscounts ){
        
        /*
        Multiply the discount amount by the number to apply
        and subtract that value from the total
        */

        total = total - discountAmt * numDiscounts;
        
        // Return the adjusted total
        return total;
    }

    this.initCart = function(){

        // Put some items in the cart
        this.cart += 'ABBACBBAB';
    }
    this.initProducts = function(){

        // Put some Products in the products array
        this.products.push( new this.Product( 'A' , 20.00 ) ,
                            new this.Product( 'B' , 50.00 , 5 , 100.00 ) ,
                            new this.Product( 'C' , 30.00 ) 
        );
    }
    this.init = function(){

        // Initialize Cart
        this.initCart();
        // Initialize Products
        this.initProducts();
    }
    this.updatePrice = function( productName , newPrice ){
        var updatee = this.findProduct( productName );
        console.log('updating ' + updatee.name );
        updatee.price = newPrice;
        console.log('New price for ' + updatee.name + ' is ' + newPrice );
    }
    this.findProduct = function( productName ){
        console.log('finding ' + productName );
        var foundProduct = _.find(this.products, function( obj ){
            return obj.name ===  productName
        });
        return foundProduct;
    }
}

module.exports = Supermarket;