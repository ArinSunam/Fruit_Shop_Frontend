import React, { useState } from 'react'
import SmallBanner from '../components/SmallBanner'
import ProductCard from '../components/ProductCard'
import Pagination from 'rc-pagination'
import 'rc-pagination/assets/index.css'
import { useGetProductQuery } from '../features/ProductApi'

const Shop = () => {

  const [currentPage, setCurrentPage] = useState(1)

  const itemsPerPage = 5

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

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (isError) {
    return <p>Something went wrong</p>
  }

  console.log('data', ProductData)
  return (
    <>
      <SmallBanner subTitle={subTitle} title={title} />

      <main className='mycontainer py-[60px] space-y-9 '>
        <section className=' grid grid-cols-3 gap-6'>
          {
            paginatedData?.map((el, i) => (
              <ProductCard el={el} key={i} />
            ))
          }
        </section>

        <Pagination
          className='flex justify-center text-primary bg-ar'
          current={currentPage}
          pageSize={itemsPerPage}
          total={ProductData?.total || 0}
          onChange={handlePageChange}
        />
      </main>
    </>
  )
}

export default Shop
