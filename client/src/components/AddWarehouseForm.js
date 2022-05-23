import { useRef } from "react";

function AddWarehouseForm(){
    const formStyle = {
        display: "block",
        margin: "1rem 0rem"
      }

    const url = "http://localhost:8080/backend/warehouses/add_warehouse";

    const warehouseNameInput = useRef();
    const locationInput = useRef();
    
    async function addWarehouseHandler(productData){
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(productData)
        };
        await fetch(url, options);
    }

    async function submissionHandler(e){
        e.preventDefault();

        const enteredWarehouseName = warehouseNameInput.current.value;
        const enteredLocation = locationInput.current.value;

        const productData = {
            name: enteredWarehouseName,
            location: enteredLocation,
            inventory: []
        }

        await addWarehouseHandler(productData);
        window.location.replace("http://localhost:8080/warehouses");

    }

    return(
        <div>
            <h2>Add Warehouse</h2>
            <form onSubmit={submissionHandler}>
                <label htmlFor="warehouseName" style={formStyle}>Enter Warehouse Name: </label>
                <input 
                type="text" 
                required 
                id="warehouseName" 
                ref={warehouseNameInput}
                style={formStyle}
                />

                <label style={formStyle} htmlFor="location">Enter warehouse location: </label>
                <input 
                type="text" 
                id="location" 
                ref={locationInput}
                style={formStyle}
                />

                <input type="submit" value="Submit" style={formStyle}/>
            </form>
        </div>
    )



}


export default AddWarehouseForm;