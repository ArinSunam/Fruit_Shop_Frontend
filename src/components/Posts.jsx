import React from 'react'
import useFetchPosts from '../hooks/useFetchPosts'

const Posts = () => {

  const { posts, isError, isLoading } = useFetchPosts()
  console.log('posts', posts)

  if (isLoading) return <h1> Loading...</h1>

  return (
    <div className='px-[30px] bg-gradient-to-br from-purple-50 to-indigo-100 min-h-screen'>
      <h1 className='py-4 text-4xl text-center font-medium'>Posts</h1>
      <div className='grid grid-cols-2 gap-4'>
        {posts?.slice(0, 10).map((el) => (
          <article className='bg-white shadow-lg rounded-xl   '>
            <div className='h-2 bg-indigo-200 '></div>
            <div className=' p-4 space-y-3'>
              <h1 className='text-xl font-medium'>{el.title}</h1>
              <p className='leading-[180%] text-justify'>{el.body}</p>
            </div>

          </article>
        ))}
      </div>
    </div>
  )
}

export default Posts
