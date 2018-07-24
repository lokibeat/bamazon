var mysql = require("mysql");
var inquirer = require("inquirer");
// connection declaration
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'bamazon_db'
});



function go() {
    // show products available to sell and query database
    console.log("======================Welcome to Bamazon========================");
    console.log("-------------------------------------------------------------------");
    console.log("Welcome to bamazon. Here is our current product list. \n")
    var query = "SELECT * FROM products";
    connection.query(query, function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("\n" +
                "Item ID: " +
                res[i].item_id +
                " || Item: " +
                res[i].product_name +
                " || Price: $" +
                res[i].retail_price.toFixed(2) + "\n"
            )
        }
// prompt for item requested and quantity
        inquirer
            .prompt([
                {
                    name: "itemToPurchase",
                    type: "input",
                    message: "Please provide item id (1-10) of the item you would like to purchase?",
                    validate: function (value) {
                        if (isNaN(value) === false) {
                            return true;
                        }
                        return false;
                    }
                },
                {
                    name: "qtyToPurchase",
                    type: "input",
                    message: "Please input how many of your item you would like.",
                    validate: function (value) {
                        if (isNaN(value) === false) {
                            return true;
                        }
                        return false;
                    }
                }])
            .then(function (answer) {
                // process answer ()
                purchaseItemID = answer.itemToPurchase - 1;
                qtyPurchased = answer.qtyToPurchase;
                qtyAfterPurchase = res[purchaseItemID].qty_in_stock - qtyPurchased
                console.log("You have selected " + qtyPurchased + " of item: " + res[purchaseItemID].product_name);
                console.log("There is " + res[purchaseItemID].qty_in_stock + " on hand");
                // check if sufficient quantity on hand
                if (qtyPurchased >= res[purchaseItemID].qty_in_stock) {
                    console.log("Insufficient Quantity");
                    // restart();
                }
                else {
                    connection.query("UPDATE products SET qty_in_stock = ? WHERE item_id = ?", [qtyAfterPurchase, purchaseItemID], function (err, res) {
                        if (err) throw err;
                        console.log("Inventory has been updated to " + qtyAfterPurchase);
                        // console.log(res)
                        
                    });
                    // generate order summary
                    unitCost = res[purchaseItemID].retail_price;
                    orderCost = unitCost * qtyPurchased;
                    console.log("------------------Order Summary-------------------")
                    console.log("Item                              Qty         Cost");
                    console.log("--------------------------------------------------");
                    console.log(res[purchaseItemID].product_name + "         " + qtyPurchased + "  @   " + unitCost)
                    console.log("--------------------------------------------------");
                    console.log("Total Cost of Order : $" + orderCost.toFixed(2));
                    // restart();
                }
            })
            // connection.end();
    })

}

function restart() {
    inquirer.prompt({
        name: "continue",
        type: "confirm",
        message: "Would you like to purchase another item?"
    }).then(function (answer){
        if(answer.continue) {
            go();
        } else {
            console.log("Thanks for shopping at bamazon.")
        }
    });
}
go();
