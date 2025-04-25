import React, { useState } from 'react'
import Navbar from '../Components/Navbar'
import Carousel from '../Components/Carousel'
import ProductSlider from '../Components/ProductSlider'
import Cards from '../Components/Cards'
import Product from '../Components/Product'
import Brands from '../Components/Brands'
import CategoryImages from '../Components/CategoryImages'
import Footer from '../Components/footer'

export default function HomePage() {
  const [hide, ishidden] = useState(true)
  return (
    <div>
        <Navbar />
        <Carousel />
        <Cards title="SHOP BY BRAND" hide={hide}/>
        <Brands />
        <Cards title="NEW ARRIVAL"/>
        <Product />
        <Cards title="BEST SELLING"/> 
        <Product />
        <Cards title="CATEGORY" hide={hide}/>
        <CategoryImages />
        <Footer />
    </div>
  )
}
