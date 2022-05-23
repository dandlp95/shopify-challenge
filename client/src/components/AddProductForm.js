import { useRef } from "react";

function AddProductForm() {
  const formStyle = {
    display: "block",
    margin: "1rem 0rem"
  }
  const url = "https://shopify-challenge.dandlp95.repl.co/backend/products/add_product";

  const productNameInputRef = useRef();
  const descriptionInputRef = useRef();
  const quantityInputRef = useRef();

  async function addProductHandler(productData) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
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

    await addProductHandler(productData);
    window.location.replace("https://shopify-challenge.dandlp95.repl.co/products");

  }

  return (
    <div>
      <h2>Add Product</h2>
      <form onSubmit={submissionHandler}>
        <label htmlFor="productName" style={formStyle}>Enter product name: </label>
        <input
          type="text"
          required
          id="productName"
          ref={productNameInputRef}
          style={formStyle}
        />

        <label htmlFor="description" style={formStyle}>Enter product description: </label>
        <input
          type="text"
          required
          id="description"
          ref={descriptionInputRef}
          style={formStyle}
        />

        <label htmlFor="quantity" style={formStyle}>Enter product quantity: </label>
        <input type="number" required id="quantity" ref={quantityInputRef} style={formStyle}/>

        <input type="submit" value="Submit" style={formStyle}/>
      </form>
    </div>
  );
}

export default AddProductForm;
