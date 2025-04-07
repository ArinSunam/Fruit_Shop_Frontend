import React, { useState } from 'react'
import SmallBanner from '../components/SmallBanner'
import ProductCard from '../components/ProductCard'
import ProductCardSkeleton from '../components/Skeleton/ProductCardSkeleton'
import Pagination from 'rc-pagination'
import 'rc-pagination/assets/index.css'
import { useGetProductQuery } from '../features/ProductApi'
import '../components/Skeleton/skeleton-styles.css'

const Shop = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6
  const { data: ProductData, isLoading, isError } = useGetProductQuery({
    page: currentPage,
    limit: itemsPerPage
  })

  const subTitle = "Fresh and organic"
  const title = "Shop"

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const paginatedData = ProductData?.data

  // Create array for skeleton placeholders
  const skeletonArray = Array(itemsPerPage).fill(0)

  if (isError) {
    return <p>Something went wrong</p>
  }

  return (
    <>
      <SmallBanner subTitle={subTitle} title={title} />
      <main className='mycontainer py-[60px] space-y-9'>
        <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {isLoading ? (

            skeletonArray.map((_, i) => (
              <div key={i} style={{ animationDelay: `${i * 0.1}s` }} className="animate-fadeIn">
                <ProductCardSkeleton />
              </div>
            ))
          ) : (
            // Show actual product cards when data is loaded
            paginatedData?.map((el, i) => <ProductCard el={el} key={i} />)
          )}
        </section>

        {!isLoading && (
          <Pagination
            className='flex justify-center text-primary bg-ar'
            current={currentPage}
            pageSize={itemsPerPage}
            total={ProductData?.total || 0}
            onChange={handlePageChange}
          />
        )}
      </main>
    </>
  )
}

export default Shop