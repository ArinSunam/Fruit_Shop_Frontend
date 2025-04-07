import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { FaShoppingCart } from 'react-icons/fa'
import { FaImage } from "react-icons/fa";

const ProductCardSkeleton = () => {
  // Use subtle variations of gray for each card
  const grayTones = [
    { base: "#f5f5f5", highlight: "#ebebeb" },
    { base: "#f0f0f0", highlight: "#e6e6e6" },
    { base: "#ececec", highlight: "#e0e0e0" },
    { base: "#f2f2f2", highlight: "#e8e8e8" }
  ];

  const randomGrayTone = grayTones[Math.floor(Math.random() * grayTones.length)];

  return (
    <div className="elegant-skeleton px-[30px] py-[20px] flex flex-col items-center gap-[10px] shadow-black/25 shadow-lg overflow-hidden">
      <SkeletonTheme baseColor={randomGrayTone.base} highlightColor={randomGrayTone.highlight}>
        {/* Image skeleton   */}
        <div className="relative">
          <Skeleton width={261} height={261} className="image-skeleton" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="skeleton-icon">
              <FaImage size={40} />
            </div>
          </div>
        </div>

        {/* Title  */}
        <div className="w-full pt-2">
          <Skeleton width="75%" height={36} />
        </div>

        {/* "Per Kg" text */}
        <div className="w-full flex">
          <Skeleton width="30%" height={20} />
        </div>

        {/* Price  */}
        <div className="w-full flex justify-center">
          <Skeleton width="50%" height={48} className="price-skeleton" />
        </div>

        {/* Button  */}
        <div className="relative w-full">
          <Skeleton width="100%" height={40} borderRadius={50} className="button-skeleton" />
          <div className="absolute inset-0 flex items-center justify-center gap-2 text-gray-300">
            <FaShoppingCart />
            <span className="font-semibold">Add to cart</span>
          </div>
        </div>
      </SkeletonTheme>
    </div>
  )
}

export default ProductCardSkeleton