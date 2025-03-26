import { RxCross2 } from "react-icons/rx";
import { NavLink, useNavigate } from "react-router-dom";

const Cart = ({ onClose }) => {

  const handleClose = () => {
    onClose();
  };

  const nav = useNavigate()

  return (
    <div className="text-black fixed right-0 top-0 bg-white xl:w-[600px] w-full sm:w-[400px] h-screen z-50 px-4 sm:px-[20px] flex flex-col justify-between">
      <div>
        <div className="flex justify-between py-4 border-b-[1px] border-b-gray-200">
          <h1 className="text-lg sm:text-[18px] font-semibold">Shopping Cart</h1>
          <RxCross2 className="text-2xl sm:text-3xl cursor-pointer" onClick={handleClose} />
        </div>

        <div className="items flex justify-between mt-10">
          <div className="flex space-x-5">
            <img
              className="w-[64px] sm:w-[74px] h-[64px] sm:h-[74px] flex-shrink-0"
              src="https://c02.purpledshub.com/uploads/sites/41/2023/09/GettyImages_154514873.jpg?w=1029&webp=1"
              alt="Immersion Heater"
            />
            <div className="info space-y-2">
              <p className="name font-semibold text-sm sm:text-base">Strawberry</p>
              <div className="number flex justify-between border-[1px] border-gray-200 px-3 py-2 text-sm sm:text-[18px]">
                <h1 className="cursor-pointer">-</h1>
                <h1>1</h1>
                <h1 className="cursor-pointer">+</h1>
              </div>
            </div>
          </div>

          <div className="price space-y-5 flex flex-col items-end">
            <RxCross2 className="bg-gray-300 rounded-full px-1 py-1 w-5 h-5 sm:w-6 sm:h-6 cursor-pointer" onClick={handleClose} />
            <h1 className="text-sm sm:text-base">$222.02</h1>
          </div>
        </div>
      </div>

      <div className="space-y-5 mb-5">
        <div className="subtotal flex justify-between border-t-[1px] border-t-gray-300 border-b-[1px] border-b-gray-300 py-2">
          <h1 className="text-sm sm:text-base">Subtotal</h1>
          <h1 className="text-sm sm:text-base">$22.02</h1>
        </div>

        <div className="view_cart">
          <NavLink to='/cartMain' onClick={handleClose}>
            <button className="w-full py-3 text-center bg-primary text-white rounded-[8px] text-sm sm:text-base">
              View Cart
            </button>
          </NavLink>
        </div>

        <div className="checkout">
          <button className="w-full py-3 text-center bg-primary text-white rounded-[8px] text-sm sm:text-base" onClick={() => {
            handleClose()
            nav('/checkout')
          }}>
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;