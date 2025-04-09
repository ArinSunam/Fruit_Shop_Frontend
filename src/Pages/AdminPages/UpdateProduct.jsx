import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
// Uncomment this if you need validation
// import { yupResolver } from "@hookform/resolvers/yup";
import {
  useGetProductDetailQuery,
  useUpdateProductMutation,
} from "../../features/ProductApi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import SmallBanner from "../../components/SmallBanner";
// Uncomment this if you need validation
// import { productSchema } from "../../schemas/ProductSchema";
import { BaseUrl } from "../../features/constant";

const UpdateProduct = () => {
  const { id } = useParams();
  const { data: ProductData } = useGetProductDetailQuery(id);
  const nav = useNavigate();
  const [preview, setPreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [updateProduct, { isLoading, isSuccess, isError, error }] = useUpdateProductMutation();
  const { user } = useSelector((store) => store.userInfo);


  console.log('Product Data:', ProductData);
  console.log('Mutation state:', { isLoading, isSuccess, isError, error });

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({

  });

  useEffect(() => {
    if (ProductData) {
      const product = ProductData.data;
      setValue("title", product.title);
      setValue("description", product.description);
      setValue("price", product.price);
      setValue("Categories", product.Categories);
      setValue("in_stock", product.in_stock);
      setPreview(`${BaseUrl}${product.image}`);
    }
  }, [ProductData, setValue]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Product updated successfully!");
      // Navigate to products page after successful update
      reset()
    }
    if (isError) {
      toast.error(error?.data?.message || "Update failed");
      console.error("Update error:", error);
    }
  }, [isSuccess, isError, error, nav]);

  const handleImageChange = (e) => {
    console.log('Image change event triggered');
    const file = e.target.files[0];
    console.log('Selected file:', file);

    if (file) {
      setImageFile(file); // Store the file in state
      const reader = new FileReader();
      reader.onload = () => {
        console.log('Image loaded');
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onUpdate = async (data) => {
    console.log('Submit function called with data:', data);

    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("price", Number(data.price));
      formData.append("Categories", data.Categories);
      formData.append("in_stock", Number(data.in_stock));
      formData.append("image", imageFile);

      const response = await updateProduct({
        id: ProductData?.data?._id,
        data: formData,
        token: user.accessToken,
      }).unwrap();

      console.log('Update response:', response);
    } catch (err) {
      console.error("Update error:", err);
      toast.error(err.message || "Update failed");
    }
  };

  return (
    <div>
      <SmallBanner title="Update Product" />
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mt-5 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Update Product</h1>

          <form onSubmit={handleSubmit(onUpdate)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Product Title */}
              <div className="col-span-2">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Product Title
                </label>
                <input
                  id="title"
                  type="text"
                  {...register("title", { required: true })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">Title is required</p>
                )}
              </div>

              {/* Price */}
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                  Price (Rs.)
                </label>
                <input
                  id="price"
                  type="number"
                  {...register("price", { required: true })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.price && (
                  <p className="mt-1 text-sm text-red-600">Price is required</p>
                )}
              </div>

              {/* Category */}
              <div>
                <label htmlFor="Categories" className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  id="Categories"
                  {...register("Categories", { required: true })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a category</option>
                  <option value="Citrus Fruit">Citrus Fruit</option>
                  <option value="Berries">Berries</option>
                  <option value="Tropical fruits">Tropical fruits</option>
                </select>
                {errors.Categories && (
                  <p className="mt-1 text-sm text-red-600">Category is required</p>
                )}
              </div>

              {/* In Stock */}
              <div>
                <label htmlFor="in_stock" className="block text-sm font-medium text-gray-700 mb-1">
                  Stock Quantity
                </label>
                <input
                  id="in_stock"
                  type="number"
                  {...register("in_stock", { required: true })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.in_stock && (
                  <p className="mt-1 text-sm text-red-600">Stock quantity is required</p>
                )}
              </div>

              {/* Product Image */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Update Product Image
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  // Remove the register hook for the file input
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="mt-2 border border-gray-300 rounded-md h-64 overflow-hidden">
                  {preview ? (
                    <img
                      src={preview}
                      alt="Product preview"
                      className="object-contain w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                      No image selected
                    </div>
                  )}
                </div>
              </div>

              {/* Product Description */}
              <div className="col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  {...register("description", { required: true })}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">Description is required</p>
                )}
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-md transition duration-200 cursor-pointer active:scale-90 disabled:bg-blue-400 disabled:cursor-not-allowed"
              >
                {isLoading ? "Updating Product..." : "Update Product"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;