import React, { useEffect, useState } from "react";
import ProductImageGallery from "../Components/ProductImageGallery";
import Navbar from "../Components/Navbar";
import ProductDescription from "../Components/ProductDescription";
import ProductReview from "../Components/ProductReview";
import Cards from "../Components/Cards";
import Product from "../Components/Product";
import Footer from "../Components/footer";
import { useLocation } from "react-router";
import axios from "axios";

export default function ProductDetailPage() {

  const [result, setResult] = useState([])
  const location = useLocation()
  console.log(location)
  const id = location.state.id
  console.log(id)
  var data=[];

    useEffect(()=>{
      window.scroll(0, 0)
      async function fetchdata(){
        console.log('useEffect function called')
        data = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/all-products/` + id)
       console.log(data.data.Specific_product[0])
       setResult(data.data.Specific_product[0])
      //  console.log(result)
      }

      fetchdata()
    },[])

    console.log(result)

  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <div className="row px-3 py-4">
        <div className="col-xl-6">
          <ProductImageGallery image_url={result.image_url}/>
        </div>
        <div className="col-xl-6 my-lg-2">
          <ProductDescription data={result}/>
          <ProductReview title="RELATED PRODUCT"/>
        </div>
      </div>
      <Cards title="RELATED PRODUCT"/>
      <Product />
      <Footer />
    </div>
  );
}
