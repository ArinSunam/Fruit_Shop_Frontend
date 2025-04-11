import { useDispatch, useSelector } from "react-redux";
import { BaseUrl } from "../features/constant";
import SmallBanner from "../components/SmallBanner";
import { useAddOrderMutation } from "../features/OrderApi";
import { clearCartItem } from "../features/cartSlice";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const CheckoutPage = () => {
  const { carts } = useSelector((store) => store.cartData);
  const { user } = useSelector((store) => store.userInfo);
  const [addOrder, { isLoading }] = useAddOrderMutation();
  const dispatch = useDispatch();
  const nav = useNavigate();
  const {
    register,
    handleSubmit
  } = useForm({
    defaultValues: {
      shipping_address: "",
      city: "",
    },
  });

  const total = carts?.reduce((a, b) => {
    return a + b.quantity * b.price;
  }, 0);

  const onSubmit = async (data) => {
    const products = carts.map((cart) => ({
      product_id: cart.product,
      quantity: cart.quantity,
    }));

    try {
      const res = await addOrder({
        data: {
          products,
          city: data.city,
          shipping_address: data.shipping_address,
        },
        token: user.accessToken,
      }).unwrap();
      console.log('res', res);
      toast.success("Order placed successfully!");
      nav('/');
      dispatch(clearCartItem());
    } catch (error) {
      console.log('checkout error', error);
      toast.error(error.data?.message || "Failed to place order");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SmallBanner title="Checkout" />

      <div className="py-8 px-4 md:px-6 lg:px-8 w-full max-w-[1360px] mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">
          Complete Your Order
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col lg:grid lg:grid-cols-5 gap-8 items-start">
            <div className="w-full lg:col-span-3">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Delivery Information
                </h2>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="shipping_address" className="block text-sm font-medium text-gray-700">
                      Shipping Address
                    </label>
                    <textarea
                      id="shipping_address"
                      {...register("shipping_address")}
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                      placeholder="Enter your complete address"
                    ></textarea>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      {...register("city")}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                      placeholder="Enter your city"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 w-full">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-4">
                <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="max-h-60 overflow-y-auto">
                    {carts?.map((cart, i) => (
                      <div key={i} className="flex items-center py-3 border-b border-gray-100">
                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 mr-4">
                          <img
                            src={`${BaseUrl}${cart.image}`}
                            alt={cart.name}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="flex-grow">
                          <h3 className="text-sm font-medium text-gray-800 line-clamp-1">
                            {cart.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            Qty: {cart.quantity} × Rs. {cart.price}
                          </p>
                        </div>
                        <p className="text-sm font-medium text-gray-800">
                          Rs. {(cart.quantity * cart.price).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>

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
                  type="submit"
                  className="w-full bg-secondary text-white font-medium py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center active:scale-90 cursor-pointer"
                >
                  {isLoading ? "Order placing..." : "Place Order"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;