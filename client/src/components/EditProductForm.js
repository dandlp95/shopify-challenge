import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

function EditProductForm() {

  const formStyle = {
    display: "block",
    margin: "1rem 0rem"
  }

  const { id } = useParams();
  const url = `http://localhost:8080/backend/edit_product/${id}`;
  const urlGet = `http://localhost:8080/backend/products/${id}`;

  const [product, setProduct] = useState(null);

  const productNameInputRef = useRef();
  const descriptionInputRef = useRef();
  const quantityInputRef = useRef();

  async function editProductHandler(data) {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    await fetch(url, options);
  }

  async function submissionHandler(e) {
    e.preventDefault();

    const enteredProductName = productNameInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;
    const enteredQuantity = quantityInputRef.current.value;

    const productData = {
      productName: enteredProductName,
      quantity: enteredQuantity,
      description: enteredDescription,
    };

    await editProductHandler(productData);
    window.location.replace("http://localhost:8080/products");
  }

  useEffect(() => {
    axios.get(urlGet).then((response) => {
      setProduct(response.data);
    });
  }, [urlGet]);

  if (product) {
    return (
      <div>
        <h2>Edit Product</h2>
        <form onSubmit={submissionHandler}>
          <label htmlFor="productName" style={formStyle}>Enter product name: </label>
          <input
            type="text"
            id="productName"
            required
            ref={productNameInputRef}
            value={product.productName}
            style={formStyle}
          />

          <label htmlFor="description" style={formStyle}>Enter product description: </label>
          <textarea
            type="text"
            id="description"
            required
            ref={descriptionInputRef}
            value={product.description}
            rows="5"
            style={formStyle}
          ></textarea>

          <label htmlFor="quantity" style={formStyle}>Enter product quantity: </label>
          <input
            type="number"
            required
            id="quantity"
            ref={quantityInputRef}
            value={product.quantity}
            style={formStyle}
          />

          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }else{
    return(
      <h2>Loading...</h2>
    )
    
  }
}

export default EditProductForm;
