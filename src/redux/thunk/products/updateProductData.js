import { updateProduct } from "../../actions/productAction";

const updateProductData = (product, id) => {
  return async (dispatch) => {
    const res = await fetch(`http://localhost:5000/update-product/${id}`, {
      method: "PUT",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    dispatch(updateProduct(data));
    console.log(data);
  };
};

export default updateProductData;
