import { loadProducts } from "../../actions/productAction";

const fetchProducts = () => {
  return async (dispatch, getState) => {
    const res = await fetch("http://localhost:5000/products");
    const data = await res.json();

    if (data.data.length) {
      dispatch(loadProducts(data.data));
    }
  };
};

export default fetchProducts;
