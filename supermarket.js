'use strict'

/* 

supermarket.js exports a Supermarket object 

List of Properties:
    
    cart: A String wherein each char is the name of a product
    products: An array of product objects that correspond to the chars in the cart string

List of Methods:

    Product(): Product constructor

    checkout(): Counts up products, sums their prices, applies discounts, and returns a Total
    countProduct(): Count up instances of a product 
    applyDiscount(): Applies discount to a total
    
    initCart(): Initialize cart as the String 'ABBACBBAB', 
            or uses argument from commandline (i.e. node checkout.js 'CCCCBBAAA') 
    initProducts(): Creates Products named 'A', 'B', and 'C' and pushes them to products[];
    init(): Runs initCart() and initProducts()
    
    findProduct(): Locate a product by name
    updatePrice(): Update a product's price

*/

var _ = require('./underscore');

var Supermarket = function(){
    
    // Allow nested access to object
    var self = this;
    // Create a cart as an empty string
    this.cart = '';
    // Create an empty products array
    this.products = [];
    // Create a constructor for Product
    this.Product = function( name, price, discountThresh, discountAmt ){
        this.name = name;
        this.price = price;
        this.discountThresh = discountThresh || null;
        this.discountAmt = discountAmt || null;
        console.log('\nCreated new Product: ');
        console.dir( this );
    }
    // Create a function that accepts a string, finds and sums products
    // from that string, then outputs a Grand Total
    this.checkout = function( items ){

        // Initialize total
        var total = 0;
        
        // Loop over products array
        _.each( self.products, function( product ){
            console.log('\nSumming '+ product.name + ' products');
        
            // Count instances of product in input string
            var numItems = self.countProduct( product.name );
            
            /* 
            Multiply the product's price by count of instances
            and add it to the total
            */

            total += numItems * product.price;
            console.log('Subtotal : $' + total);          
        
            /* 
            If a product has discount data and the count of instances 
            of the item is greater than its discount threshold, 
            count up the number of discounts, sum them, and subtract 
            them from the total
            */
            if(product.discountThresh && product.discountAmt){
                if( numItems/product.discountThresh >= 1){
                    var numDiscounts = Math.floor( numItems/product.discountThresh );
                    total = self.applyDiscount( total, product.discountAmt , numDiscounts );
                    console.log('Discount applied, Subtotal: $' + total);
                }
            }
        });
    
        // return the total cost for the cart
        console.log('\nGRAND TOTAL FOR CART:  $' + total +'\n' );
        return total;
    }
    // Count up instances of a product
    this.countProduct = function( productName ){

        // Split the input string into an array
        var itemsArray = self.cart.split('');

        // Filter based on product name
        var filteredArray = _.filter( self.cart , function(char){ return char === productName});
        
        // Return the length of the array
        return( filteredArray.length );
    }
    // Apply a discount to a total
    this.applyDiscount = function( total , discountAmt , numDiscounts ){
        
        /*
        Multiply the discount amount by the number to apply
        and subtract that value from the total
        */

        total = total - discountAmt * numDiscounts;
        
        // Return the adjusted total
        return total;
    }
    // Initialize the cart string
    this.initCart = function( string ){

        // Put some items in the cart
        this.cart += process.argv[2] || 'ABBACBBAB';
        console.log( 'Cart initialized ' + self.cart );
    }
    // Initialize the Products array
    this.initProducts = function(){

        // Put some Products in the products array
            self.addProduct( 'A' , 20.00 );
            self.addProduct( 'B' , 50.00 , 5 , 100.00 );
            self.addProduct( 'C' , 30.00 ); 

        // Attempt to add another Product named 'A', expect to reject
            self.addProduct( 'A' , 20.00 );
    }
    // Initialize both cart and products
    this.init = function(){

        // Initialize Cart
        this.initCart();
        // Initialize Products
        this.initProducts();
    }
    // Update a product's price
    this.updatePrice = function( productName , newPrice ){
        var updatee = self.findProduct( productName );
        console.log('\nupdating ' + updatee.name );
        updatee.price = newPrice;
        console.log('\nNew price for ' + updatee.name + ' is ' + newPrice );
    }
    // Find a product by name
    this.findProduct = function( productName ){
        console.log('\nFinding ' + productName );
        var foundProduct = _.find(self.products, function( obj ){
            return obj.name ===  productName
        });
        if( !foundProduct ){
            console.log('Product not found ');
            return;
        } else {
            return foundProduct;
        }
    }
    // Add a product
    this.addProduct = function( name, price, discountThresh, discountAmt ){
        // Name and price are required, so test for those
        if( name && price ){
              // If the product is already in the inventory, return with a comment
              if( self.findProduct( name ) ){
                console.log('That product is already in the inventory');
                return;
            } else {
                // Else, create a new Product  
                var newProduct = new self.Product( name, price, discountThresh, discountAmt );
                self.products.push( newProduct );
            }
        } else {
            console.log('A name and price are required to add a product');
            return;
        }
    }
}

module.exports = Supermarket;
