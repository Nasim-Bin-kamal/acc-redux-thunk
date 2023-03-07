import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../../components/ProductCard";
import {
  removeAllFilter,
  toggleBrand,
  toggleStock,
} from "../../redux/actions/fliterActions";
import fetchProducts from "../../redux/thunk/products/fetchProducts";

import moment from "moment";

const Home = () => {
  const filters = useSelector((state) => state.filter.filters);
  const products = useSelector((state) => state.product.products);
  const { brands, stock } = filters;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const activeClass = "text-white bg-indigo-500 border-white";

  let content;

  if (products.length) {
    content = products.map((product) => (
      <ProductCard key={product.model} product={product} />
    ));
  }

  if (products.length && (stock || brands.length)) {
    content = products
      .filter((product) => {
        if (stock) {
          return product.status === true;
        }
        return product;
      })
      .filter((product) => {
        if (brands.length) {
          return brands.includes(product.brand);
        }

        return product;
      })
      .map((product) => <ProductCard key={product.model} product={product} />);
  }

  return (
    <div className="max-w-7xl gap-14 mx-auto my-10 ">
      <div className="py-2 ">
        <h4 className="text-xl font-bold">
          {moment().format("Do MMMM YYYY, h:mm:ss a")}
        </h4>
      </div>
      <div className="mb-10 flex justify-end gap-5 ">
        <button
          className={`border px-3 py-2 rounded-full font-semibold ${
            stock ? activeClass : null
          }`}
          onClick={() => dispatch(toggleStock())}
        >
          In Stock
        </button>
        <button
          className={`border px-3 py-2 rounded-full font-semibold ${
            brands.includes("amd") ? activeClass : null
          }`}
          onClick={() => dispatch(toggleBrand("amd"))}
        >
          AMD
        </button>
        <button
          className={`border px-3 py-2 rounded-full font-semibold ${
            brands.includes("intel") ? activeClass : null
          }`}
          onClick={() => dispatch(toggleBrand("intel"))}
        >
          Intel
        </button>
        <button
          className={`border px-3 py-2 rounded-full font-semibold `}
          onClick={() => dispatch(removeAllFilter())}
        >
          Remove All
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14">
        {content}
      </div>
    </div>
  );
};

export default Home;
