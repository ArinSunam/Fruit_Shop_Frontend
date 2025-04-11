import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addOrUpdateCart, removeCart } from "../../features/cartSlice";
import { BaseUrl } from "../../features/constant";
import SmallBanner from "../../components/SmallBanner";
import { FaTrash } from "react-icons/fa";

const CartPage = () => {
  const { carts } = useSelector((store) => store.cartData);
  const nav = useNavigate();
  const dispatch = useDispatch();

  const total = carts?.reduce((a, b) => {
    return a + b.quantity * b.price;
  }, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <SmallBanner title="Cart" />

      <div className="py-8 px-4 md:px-6 lg:px-8 w-full max-w-[1360px] mx-auto">
        {carts?.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[360px] mt-8 bg-white rounded-xl shadow-md p-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-6">Looks like you haven't added any items to your cart yet.</p>
            <button
              onClick={() => nav('/shop')}
              className="cursor-pointer bg-secondary  text-white font-medium py-2 px-6 rounded-lg transition duration-300"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">Your Shopping Cart</h1>
            <div className="flex flex-col lg:grid lg:grid-cols-5 gap-8 items-start">
              <div className="w-full lg:col-span-3 items-start">
                {carts?.map((cart, i) => {
                  return (
                    <div
                      key={i}
                      className="flex flex-col gap-5 mb-5 w-full bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition duration-300 relative z-[10]"
                    >
                      <div className="relative self-center shrink-0 w-[130px] sm:w-[160px] aspect-[3/2] overflow-hidden rounded-lg bg-gray-100">
                        <img src={`${BaseUrl}${cart.image}`} alt="product image" className="object-cover h-full w-full" />
                      </div>

                      <div className="flex justify-between w-full">
                        <div className="flex flex-col justify-between">
                          <h1 className=" text-[18px] font-medium text-gray-800 line-clamp-2">
                            {cart.name}
                          </h1>
                          <p className=" text-[16px] font-medium text-secondary">
                            Rs. {cart.price}
                          </p>


                        </div>
                        <div className="flex flex-col justify-between items-end">
                          <div className="flex items-center mt-2">
                            <span className="text-gray-600 mr-2 text-[14px]">Qty:</span>
                            <select
                              value={cart.quantity}
                              onChange={(e) => {
                                dispatch(
                                  addOrUpdateCart({
                                    name: cart.name,
                                    quantity: Number(e.target.value),
                                    image: cart.image,
                                    price: cart.price,
                                    product: cart.product,
                                    countInStock: cart.countInStock,
                                  })
                                );
                              }}
                              className="bg-gray-50 border border-gray-300 text-gray-700 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary"
                            >
                              {[...Array(cart.countInStock).keys()].map(
                                (el, i) => {
                                  return (
                                    <option key={i} value={el + 1}>
                                      {el + 1}
                                    </option>
                                  );
                                }
                              )}
                            </select>
                          </div>


                          <button
                            onClick={() => dispatch(removeCart(i))}
                            className="absolute top-1 mt-4 text-red-500 hover:text-red-700 flex items-center text-sm font-medium z-10 cursor-pointer"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="lg:col-span-2 w-full bg-white rounded-xl shadow-sm p-6 sticky top-4">
                <h1 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                  Order Summary
                </h1>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center py-2">
                    <p className="text-gray-600">Items</p>
                    <p className="font-medium text-gray-800">{carts?.length}</p>
                  </div>

                  <div className="flex justify-between items-center py-2">
                    <p className="text-gray-600">Total Amount</p>
                    <p className="font-medium text-gray-800">Rs. {total?.toLocaleString()}</p>
                  </div>

                  <div className="flex justify-between items-center py-2">
                    <p className="text-gray-600">Payment Method</p>
                    <p className="font-medium text-gray-800">Cash On Delivery</p>
                  </div>
                </div>

                <button
                  onClick={() => nav("/checkout")}
                  className="w-full bg-secondary text-white font-medium py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center cursor-pointer active:scale-90"
                >
                  Proceed To Checkout

                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;