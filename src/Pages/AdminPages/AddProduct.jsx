import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAddProductMutation } from "../../features/ProductApi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const AddProduct = () => {
  const nav = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [addProduct] = useAddProductMutation();
  const { user } = useSelector((store) => store.userInfo);

  const productSchema = yup.object().shape({
    title: yup.string()
      .min(5, "Product title must be at least 5 characters")
      .max(50, "Product title cannot exceed 50 characters")
      .required("Product title is required"),
    description: yup.string()
      .min(10, "Description must be at least 10 characters")
      .max(9000, "Description cannot exceed 200 characters")
      .required("Product description is required"),
    price: yup.number()
      .min(1)
      .max(5000)
      .required("Price is required"),
    Categories: yup.string()
      .required("Category is required")
      .oneOf(['Citrus Fruit', 'Berries', 'Tropical fruits'], "Invalid category"),
    in_stock: yup.number()
      .min(0, "Stock quantity cannot be negative")
      .max(300, "Stock quantity cannot exceed 300")
      .required("Stock quantity is required"),
    image: yup.mixed()
      .test(
        "fileType",
        "Please upload a valid image (jpeg, png, jpg)",
        (value) =>
          value && ["image/jpeg", "image/png", "image/jpg"].includes(value.type)
      )
      .test(
        "fileSize",
        "Image size must be less than 10MB",
        (value) => value && value.size <= 10 * 1024 * 1024
      )
      .required("Product image is required"),
  });

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
    resolver: yupResolver(productSchema),
    defaultValues: {
      title: "",
      description: "",
      price: "",
      Categories: "",
      in_stock: 0,
      image: null,
    }
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("price", Number(data.price));
      formData.append("Categories", data.Categories);
      formData.append("in_stock", Number(data.in_stock));
      formData.append("image", data.image);

      const response = await addProduct({
        body: formData,
      }).unwrap();

      toast.success(response);
      setIsLoading(false);
      setPreview(null);
      reset();
      nav(-1);
    } catch (err) {
      console.log('error adding prodd', err)
      setIsLoading(false);
      toast.error(err.data || "Failed to add product");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue("image", file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setPreview(reader.result);
      };
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Add Product</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Title */}
            <div className="col-span-2">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Product Title
              </label>
              <input
                id="title"
                type="text"
                {...register("title")}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
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
                {...register("price")}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.price && (
                <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
              )}
            </div>

            {/* Category */}
            <div>
              <label htmlFor="Categories" className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                id="Categories"
                {...register("Categories")}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a category</option>
                <option value="Citrus Fruit">Citrus Fruit</option>
                <option value="Berries">Berries</option>
                <option value="Tropical fruits">Tropical fruits</option>
              </select>
              {errors.Categories && (
                <p className="mt-1 text-sm text-red-600">{errors.Categories.message}</p>
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
                {...register("in_stock")}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.in_stock && (
                <p className="mt-1 text-sm text-red-600">{errors.in_stock.message}</p>
              )}
            </div>

            {/* Product Image */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.image && (
                <p className="mt-1 text-sm text-red-600">{errors.image.message}</p>
              )}
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
                {...register("description")}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
              )}
            </div>
          </div>

          <div className="mt-6">
            {isLoading ? (
              <button
                disabled
                className="w-full bg-blue-500 text-white py-3 px-4 rounded-md opacity-70 flex justify-center"
              >
                <div className="h-6 w-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              </button>
            ) : (
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-md transition duration-200"
              >
                Add Product
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;