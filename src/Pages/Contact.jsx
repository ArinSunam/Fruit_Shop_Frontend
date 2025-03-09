import React from 'react'
import SmallBanner from '../components/SmallBanner'

const Contact = () => {

  const subtitle = "24/7 available but only girls"
  const title = "Contact Us"

  return (
    <div>
      <SmallBanner title={title} subTitle={subtitle} />
    </div>
  )
}

export default Contact
