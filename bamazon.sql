-- // create database

-- // create product table
--     // * item_id (unique id for each product)
--     //    * product_name (Name of product)
--     //    * department_name
--     //    * price (cost to customer)
--     //    * stock_quantity (how much of the product is available in stores)

-- // populate tables

DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE IF NOT EXISTS bamazon_db;

USE bamazon_db;

CREATE TABLE IF NOT EXISTS products (
	item_id INT(50) NOT NULL AUTO_INCREMENT
    , product_name VARCHAR(50) NOT NULL
    , department_name VARCHAR(50) NOT NULL
    , retail_price DECIMAL(13,2) NOT NULL
    , qty_in_stock DECIMAL (10,0) 
    , PRIMARY KEY (item_id)
);
