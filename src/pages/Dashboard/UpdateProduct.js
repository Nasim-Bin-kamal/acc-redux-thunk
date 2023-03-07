import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import fetchProducts from "../../redux/thunk/products/fetchProducts";
import updateProductData from "../../redux/thunk/products/updateProductData";

const UpdateProduct = () => {
  const [editProduct, setEditProduct] = useState({});
  console.log({ editProduct });
  const { register, handleSubmit, reset } = useForm();

  const { id } = useParams();
  // console.log(id);
  const dispatch = useDispatch();

  const products = useSelector((state) => state.product.products);
  // console.log(products);

  const editProductDetails = () => {
    reset();
    setEditProduct(products?.find((product) => product._id === id));
  };

  useEffect(() => {
    editProductDetails();
  }, []);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const submit = (data) => {
    const product = {
      model: data.model,
      brand: data.brand,
      status: data.status === "true" ? true : false,
      price: data.price,
      keyFeature: [
        data.keyFeature1,
        data.keyFeature2,
        data.keyFeature3,
        data.keyFeature4,
      ],
      spec: [],
    };

    dispatch(updateProductData(product, editProduct._id));

    console.log(product, editProduct._id);
  };

  return (
    <div className="flex flex-col justify-center items-center h-full ">
      <div>
        <h3 className="py-2 text-xl font-bold">Edit Product</h3>
      </div>
      <form
        className="shadow-lg p-10 rounded-md flex flex-wrap gap-3 max-w-3xl justify-between bg-white"
        onSubmit={handleSubmit(submit)}
      >
        <div className="flex flex-col w-full max-w-xs">
          <label className="mb-2" htmlFor="model">
            Model
          </label>
          <input
            type="text"
            id="model"
            {...register("model")}
            defaultValue={editProduct?.model}
          />
        </div>
        <div className="flex flex-col w-full max-w-xs">
          <label className="mb-2" htmlFor="image">
            Image
          </label>
          <input
            type="text"
            name="image"
            id="image"
            {...register("image")}
            defaultValue={editProduct?.image}
          />
        </div>

        <div className="flex flex-col w-full max-w-xs">
          <label className="mb-3" htmlFor="brand">
            Brand
          </label>
          <select
            name="brand"
            id="brand"
            {...register("brand")}
            defaultChecked={editProduct?.brand}
          >
            <option value="amd">AMD</option>
            <option value="intel">Intel</option>
          </select>
        </div>
        <div className="flex flex-col w-full max-w-xs">
          <label className="mb-2" htmlFor="price">
            Image
          </label>
          <input
            type="text"
            name="price"
            id="price"
            {...register("price")}
            defaultValue={editProduct?.price}
          />
        </div>

        <div className="flex flex-col w-full max-w-xs">
          <h1 className="mb-3">Availability</h1>
          <div className="flex gap-3">
            <div>
              <input
                type="radio"
                id="available"
                value={true}
                {...register("status")}
                defaultChecked={editProduct?.status}
              />
              <label className="ml-2 text-lg" htmlFor="available">
                Available
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="stockOut"
                name="status"
                value={false}
                {...register("status")}
                defaultChecked={editProduct?.status}
              />
              <label className="ml-2 text-lg" htmlFor="stockOut">
                Stock out
              </label>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full max-w-xs"></div>
        {editProduct?.keyFeature?.map((feature, index) => (
          <div className="flex flex-col w-full max-w-xs" key={index}>
            <label className="mb-2" htmlFor="keyFeature1">
              Key Feature {index + 1}
            </label>
            <input
              type="text"
              name="keyFeature1"
              id="keyFeature1"
              {...register("keyFeature1")}
              defaultValue={feature}
            />
          </div>
        ))}

        <div className="flex justify-between items-center w-full">
          <button
            className=" px-4 py-3 bg-indigo-500 rounded-md font-semibold text-white text-lg disabled:bg-gray-500"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;
