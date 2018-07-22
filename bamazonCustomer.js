var mysql = require("mysql");
var inquirer = require("inquirer");

// Node app
    // show products available to sell
        // establish connection
        var connection = mysql.createConnection({
            host: "localhost",
            port: 3306,
            user: 'root',
            password: 'root',
            database: 'bamazon_db'
        });
        
        // main connection
        connection.connect((err)=>{
            if (err) throw err;
            console.log("connected as id " + connection.threadId + "\n");
            connection.end();
            console.log("connection terminated");
        });
        // query database


    // prompt user
        // what product would you like to buy
        // how many would you like?
    
    // fulfill order
        // check inventory availability. if not prompt `Insufficient quantity!` and return to order form
        // subtract from inventory
        // calculate total cost of purchase