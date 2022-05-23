const warehouses = require("../controller/warehouses"); // The logic behind each endpoint can be found here.
const routes = require("express").Router();

routes.get("/", warehouses.getAllWarehouses);

routes.get("/:id", warehouses.getWarehouse);

routes.get("/getInventory/:id", warehouses.getInventory);

routes.put("/:id/:productId", warehouses.addProductWarehouse);

routes.post("/add_warehouse", warehouses.addWarehouse);

module.exports = routes;





