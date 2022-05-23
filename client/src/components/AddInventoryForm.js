import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function AddInventoryForm() {
  const formStyle = {
    display: "block",
    margin: "1rem 0rem",
  };

  const urlAllWarehouses = "http://localhost:8080/backend/warehouses";
  const [warehouses, setWarehouses] = useState(null);

  const { id } = useParams(); // This is id of the product

  const quantityInputRef = useRef();
  const warehouseInputRef = useRef();

  async function addInventoryHandler(qty, url) {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(qty),
    };
    await fetch(url, options);
  }

  async function submissionHandler(e) {
    e.preventDefault();

    const enteredQuantity = quantityInputRef.current.value;
    const enteredWarehouse = warehouseInputRef.current.value;
    const productId = id;

    const quantity = {
      quantity: enteredQuantity,
    };

    const urlReq = `http://localhost:8080/backend/warehouses/${enteredWarehouse}/${productId}`;

    await addInventoryHandler(quantity, urlReq);
    window.location.replace("http://localhost:8080/success");
  }

  useEffect(() => {
    axios.get(urlAllWarehouses).then((response) => {
      setWarehouses(response.data);
    });
  }, [urlAllWarehouses]);

  if (warehouses) {
    return (
      <form onSubmit={submissionHandler}>
        <label htmlFor="quantity" style={formStyle}>Quantity: </label>
        <input type="number" id="quantity" required ref={quantityInputRef} style={formStyle}/>

        <label htmlFor="warehouse" style={formStyle}>Select the Warehouse: </label>
        <select name="warehouse" id="warehouse" ref={warehouseInputRef} style={formStyle}>
          {warehouses.map((warehouse) => {
            return <option value={warehouse._id}>{warehouse.name}</option>;
          })}
        </select>

        <input style={formStyle} type="submit" value="Submit" />
      </form>
    );
  }
}

export default AddInventoryForm;
