import * as yup from "yup";
export const productSchema = yup.object().shape({
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