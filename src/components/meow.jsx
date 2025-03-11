const myau = [
  {
    data: 9875
  },
  {
    data: [
      'dfjdjf',
      'djfjdjfd'
    ]
  }
]

import React from 'react'

const Meow = () => {
  return (
    <div>
      {
        myau.map((el) => (
          <>
            {el.data.length ?
              <ul>
                {
                  el.data.map((arr) => (
                    <p>{arr}</p>
                  ))
                }
              </ul>
              :
              <p>{el.data}</p>
            }
          </>
        ))
      }

    </div>
  )
}

export default Meow
