import { useState } from "react";
import SmallBanner from "../../components/SmallBanner";
import { toast } from "react-toastify";
import { FiEdit2 } from "react-icons/fi";
import { MdDelete } from "react-icons/md";


const MOCK_PRODUCTS = [
  {
    _id: "1",
    product_name: "Apple",
    product_price: 150,
    product_image: "https://hips.hearstapps.com/hmg-prod/images/ripe-apple-royalty-free-image-1659454396.jpg?crop=0.924xw:0.679xh;0.0197xw,0.212xh&resize=980:*",
    createdAt: "2025-03-20T12:00:00Z"
  },
  {
    _id: "2",
    product_name: "Banana",
    product_price: 60,
    product_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLWh-E-5rCitwZiTaKzesMB6kupUh0TRu1FQ&s",
    createdAt: "2025-03-15T12:00:00Z"
  },
  {
    _id: "3",
    product_name: "Orange",
    product_price: 120,
    product_image: "https://www.quanta.org/orange/orange.jpg",
    createdAt: "2025-03-10T12:00:00Z"
  },
  {
    _id: "4",
    product_name: "Mango",
    product_price: 250,
    product_image: "https://listonic.com/phimageproxy/listonic/products/mango.webp",
    createdAt: "2025-03-05T12:00:00Z"
  },
  {
    _id: "5",
    product_name: "Grapes",
    product_price: 200,
    product_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_vo6eSyQ3RoHplw9JOFL6UbaE3y1Nl5L09A&s",
    createdAt: "2025-02-28T12:00:00Z"
  }
];


const TABLE_HEAD = ["Products", "Price", "Created At", "Edit", "Delete"];

const ProductList = () => {
  const [deleteIsLoading, setDeleteIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [isLoading, setIsLoading] = useState(false);


  const navigate = (path) => {
    console.log(`Navigating to: ${path}`);
  };

  const [open, setOpen] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState({
    id: null,
    product_name: null,
  });

  const handleDeleteBox = () => {
    setOpen(false);
    setProductIdToDelete({ id: null, product_name: null });
  };

  const handleDelete = () => {
    setDeleteIsLoading(true);


    setTimeout(() => {
      setProducts(products.filter(product => product._id !== productIdToDelete.id));
      setOpen(false);


      toast.success('Item successfully deleted')

      setProductIdToDelete({ id: null, product_name: null });
      setDeleteIsLoading(false);
    }, 1000);
  };



  const title = "Product list"

  const formatDate = (dateString) => {

    const date = new Date(dateString);
    console.log('date', date)
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };



  const ITEMS_PER_PAGE = 5;
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);



  return (
    <div >


      <SmallBanner title={title} />

      <div className="container mx-auto px-4 ">
        {/* Header */}
        <div className="mt-8 mb-6 flex flex-col-reverse items-start lg:flex-row lg:items-center justify-between gap-5">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Product List</h2>
            <p className="mt-1 text-gray-500">See information about all products</p>
          </div>
          <button
            onClick={() => navigate("/addProduct")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
            </svg>
            Add Product
          </button>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-xl shadow-md w-full my-5 overflow-hidden">
          <div className="overflow-x-auto h-[500px]">
            <table className="w-full min-w-full table-auto text-left">
              <thead className="sticky top-0 z-10 bg-gray-50 border-b border-gray-200">
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider"
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {!isLoading ? (
                  <>
                    {products.length > 0 ? (
                      products.map(
                        ({
                          product_image,
                          product_name,
                          createdAt,
                          _id,
                          product_price,
                        }) => (
                          <tr key={_id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                                  <img src={product_image} alt={product_name} className="h-full w-full object-cover" />
                                </div>
                                <span className="text-sm font-medium text-gray-800">{product_name}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-sm font-medium text-gray-800">Rs.{product_price}</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-sm text-gray-600">
                                {formatDate(createdAt)}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <button
                                onClick={() => navigate(`/editProduct/${_id}`)}
                                className="p-2 rounded-full hover:bg-blue-50 transition-colors text-blue-600"
                                title="Edit Product"
                              >
                                <FiEdit2 />
                              </button>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <button
                                onClick={() => {
                                  setOpen(true);
                                  setProductIdToDelete({
                                    id: _id,
                                    product_name,
                                  });
                                }}
                                className="p-2 rounded-full hover:bg-red-50 transition-colors text-red-600"
                                title="Remove Product"
                              >
                                <MdDelete />
                              </button>
                            </td>
                          </tr>
                        )
                      )
                    ) : (
                      <tr>
                        <td colSpan={5} className="px-6 py-10 text-center">
                          <span className="text-xl font-bold text-gray-400">
                            Sorry, no products found
                          </span>
                        </td>
                      </tr>
                    )}
                  </>
                ) : (
                  productListSkeleton()
                )}
              </tbody>
            </table>
          </div>
        </div>


        {!isLoading && totalPages > 0 && (
          <div className="flex justify-center px-5 my-5 gap-4 items-center">
            <button
              onClick={() => {
                setPage((prevPage) => Math.max(prevPage - 1, 1));
              }}
              className={`py-2 px-4 rounded-lg shadow ${page === 1
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-gray-800 text-white hover:bg-black cursor-pointer"
                } transition-colors`}
              disabled={page === 1}
            >
              Previous
            </button>
            <div className="flex items-center gap-1">
              <span className="px-3 py-1 rounded-md bg-blue-600 text-white font-medium">{page}</span>
              <span className="text-gray-500">of</span>
              <span className="px-3 py-1 rounded-md bg-gray-100 text-gray-700 font-medium">{totalPages}</span>
            </div>
            <button
              onClick={() => {
                setPage((prevPage) => Math.min(prevPage + 1, totalPages));
              }}
              className={`py-2 px-4 rounded-lg shadow ${page >= totalPages
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-gray-800 text-white hover:bg-black cursor-pointer"
                } transition-colors`}
              disabled={page >= totalPages}
            >
              Next
            </button>
          </div>
        )}


        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 animate-fadeIn">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full overflow-hidden animate-scaleIn">
              <div className="flex items-center p-6 border-b border-gray-200">
                <div className="bg-red-100 p-3 rounded-full mr-4">
                  <MdDelete className="text-red-500 text-xl" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Confirm Deletion</h3>
              </div>

              <div className="px-6 py-4">
                <p className="text-gray-700 mb-2">
                  Are you sure you want to delete <span className="font-semibold text-gray-900">{productIdToDelete?.product_name}</span>?
                </p>
                <p className="text-sm text-gray-500">
                  This action cannot be undone. This product will be permanently removed from the system.
                </p>
              </div>

              <div className="px-6 py-4 bg-gray-50 flex justify-end gap-3">
                <button
                  onClick={handleDeleteBox}
                  className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={deleteIsLoading}
                  className={`px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all ${deleteIsLoading
                    ? "bg-red-300 text-white cursor-not-allowed"
                    : "bg-red-600 text-white hover:bg-red-700"
                    }`}
                >
                  {deleteIsLoading ? (
                    <span>Deleting...</span>
                  ) : (
                    "Delete Product"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;