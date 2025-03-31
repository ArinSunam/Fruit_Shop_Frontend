import { FaCheck } from "react-icons/fa6";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetProductDetailQuery } from "../features/ProductApi";
import SmallBanner from "../components/SmallBanner";
import { BaseUrl } from "../features/constant";
import { useDispatch, } from "react-redux";
import { addOrUpdateCart } from "../features/cartSlice";



const ShopDetail = () => {



  const dispatch = useDispatch();
  const subTitle = "Fresh and organic"
  const title = "Shop Detail"
  const { id } = useParams();


  const { data: item } = useGetProductDetailQuery(id);


  const [quantity, setQuantity] = useState(1)
  const increment = () => {
    if (quantity !== item?.stock_quantity) {
      setQuantity((prev) => prev + 1)
    }
  }
  const decrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }


  console.log(item)

  return (
    <>
      <SmallBanner subTitle={subTitle} title={title} />

      <div className="mycontainer py-[50px] lg:py-[70px] px-4 lg:px-0">


        <div key={item?._id}>
          <div className="items flex flex-col lg:flex-row lg:space-x-[100px]">
            <div className="image flex justify-center">
              <img
                className="w-full lg:w-[700px] lg:h-[500px] object-cover"
                src={`${BaseUrl}${item?.data.image}`}
                alt={item?.data.title}
              />
            </div>

            <div className="right mt-8 lg:mt-0">
              <h1 className="text-[24px] lg:text-[30px] font-semibold">{item?.data.title}</h1>
              <h2 className="text-[20px] lg:text-[25px] mt-2">
                Rs. {item?.data.price}</h2>
              <div className="quantity mt-5">
                <p className="text-gray-400 pb-2">Only {item?.data.in_stock} items in stock</p>
                <div className="bg-gray-200 w-full lg:w-[300px] h-[5px] rounded-[4px]">
                  <div className="bg-secondary w-[80%] lg:w-[250px] h-[5px] rounded-[4px]"></div>
                </div>

                <h1 className="font-bold mt-5">Quantity</h1>
                <div className="cart flex space-x-5 mt-3">
                  <div className="flex w-[150px] justify-between border-[1px] border-black rounded-full px-5 py-2">
                    <button onClick={decrement}>-</button>
                    <h1>{quantity}</h1>
                    <button onClick={increment}>+</button>
                  </div>
                </div>

                <div className="btn mt-5 w-full">
                  <button
                    className="bg-primary w-full text-[17px] text-white py-3 text-center rounded-[8px] cursor-pointer"
                    onClick={() => {
                      dispatch(
                        addOrUpdateCart({
                          name: item?.data.title,
                          quantity: Number(1),
                          image: item?.data.image,
                          price: item?.data.price,
                          product: item?.data._id,
                          countInStock: item?.data.in_stock
                        })

                      )

                    }}
                  >
                    Add to Cart
                  </button>
                </div>

                <h1 className="flex items-center mt-5 text-[15px] lg:text-[17px]">
                  <FaCheck className="text-green-700 mr-2" /> Pickup available at Fruitkha
                </h1>
                <p className="text-gray-400 text-[14px] ml-4">Cash On Delivery </p>
              </div>
            </div>
          </div>

          <div className="description mt-[50px]">
            <div className="heading text-[18px] lg:text-[20px] font-semibold">
              <div className="pb-5">
                <h2 className="text-[24px] sm:text-[35px] font-medium font-WorkSans pb-2 inline-block">
                  Description
                </h2>
                <div className="h-[2px] w-[80px] bg-secondary ml-12" />
              </div>
            </div>

            <div className="mt-5 text-[14px] lg:text-[16px] space-y-5 text-justify" dangerouslySetInnerHTML={{ __html: item?.data.description }} />
          </div>
        </div>


      </div>
    </>
  );
};

export default ShopDetail;