const warehouseModel = require("../db/warehouseModel");
const productModel = require("../db/productModel");
const mongoose = require("mongoose");

const getAllWarehouses = async function (req, res) {
  // finds all products added to the products collection
  const warehouses = await warehouseModel.find({});

  try {
    res.status(200).send(warehouses);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getWarehouse = async function (req, res) {
  // id obtained from the endpoint in the url.
  const warehouse = await warehouseModel.findById(req.params.id);

  try {
    res.status(200).send(warehouse);
  } catch (err) {
    res.status(500).send(err);
  }
};

const addProductWarehouse = async function (req, res) {
  const objectId = mongoose.Types.ObjectId(req.params.productId);
  const qtyAdded = req.body.quantity; // Quantity added to inventory
  const inventoryProduct = await productModel.findById(req.params.productId);
  const totalQty = inventoryProduct.quantity;

  // Cant add inventory to warehouse if there is not enough stock.
  if (qtyAdded > totalQty) {
    res.send("Insufficient Inventory.");
  } else {
    const warehouse = await warehouseModel.findById(req.params.id);

    // Checks if product already exists in inventory. 
    // If it does, it will just add the quantity.
    const productExists = warehouse.inventory.some(function (inventoryItem) {
      return inventoryItem.product.toString() === objectId.toString();
      
    });

    if (!productExists) {
      // product references product in products collection.
      const addedInventory = {
        product: objectId,
        quantity: qtyAdded,
      };

      // adds product to inventory of specific warehouse and then saves it.
      warehouse.inventory.push(addedInventory);
      await warehouse.save();
    } else {

      // productIndex refers to the array item in the inventory with the id that 
      // matches the product we are adding to the database.
      const productIndex = warehouse.inventory.findIndex(function (inventoryItem) {
        return inventoryItem.product.toString() == objectId.toString();
      });

      warehouse.inventory[productIndex].quantity += parseInt(qtyAdded);
      warehouse.save();
    }

    inventoryProduct.quantity = totalQty - qtyAdded; // Removes qty from inventory.
    inventoryProduct.save();

    try {
      res.status(200).send(`Product Added succesfully: ${inventoryProduct}`);
    } catch (err) {
      res.status(500).send(err);
    }
  }
};

const getInventory = async function (req, res) {
  // finds the warehouse and populate method allows easy access to the products 
  // in references in the products collection.
  const warehouse = await warehouseModel
    .findById(req.params.id)
    .populate("inventory.product");

  inventory = warehouse.inventory.map((item) => {
    // return item.product;
    return {
      name: item.product.productName,
      description: item.product.description,
      quantity: item.quantity,
    };
  });

  try {
    res.status(200).send(inventory);
  } catch (err) {
    res.status(500).send(err);
  }
};

const addWarehouse = async function(req, res){
    // Creates new instance of product Model
    const warehouse = new warehouseModel(req.body);

    try{
      await warehouse.save();
      res.status(200).send(warehouse);
    }catch (err) {
      res.status(500).send(err);
    }
}

module.exports = {
  getAllWarehouses,
  getWarehouse,
  addProductWarehouse,
  getInventory,
  addWarehouse
};
