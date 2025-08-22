import { useEffect, useState } from "react";
import ProductImageGallery from "../Components/Products/ProductImageGallery";
import Navbar from "../Components/layout/Navbar";
import ProductDescription from "../Components/Products/ProductDescription";
import ProductReview from "../Components/Products/ProductReview";
import Header from "../Components/common/Header";
import Product from "../Components/Products/Product";
import Footer from "../Components/layout/Footer";
import { useLocation } from "react-router";
import axios from "axios";
import Loader from "../Components/common/Loader";

export default function ProductDetailPage() {
  const [result, setResult] = useState([]);
  const [all_products, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  // console.log(location)
  const id = location.state.id;
  // console.log(id);

  useEffect(() => {
    window.scroll(0, 0);
    async function fetchdata() {
      try {
        // console.log("useEffect function called");
        const data = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API_URL}/api/all-products/` + id
        );
        //  console.log(data.data.Specific_product[0])
        setResult(data.data.Specific_product);
        //  console.log(result)
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchdata();
  }, []);

  useEffect(() => {
    async function fetchdata() {
      try {
        const data = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API_URL}/api/all-products`
        );
        // console.log(data.data.all_products[0].image_url);
        setAllProducts(data.data.all_products);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchdata();
  }, []);

  // console.log(result)

  if (loading) {
    return <Loader />
  }

  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <div className="row px-3 py-4">
        <div className="col-xl-6">
          <ProductImageGallery product_images={result} />
        </div>
        <div className="col-xl-6 my-lg-2 my-md-2 my-sm-2 my-2">
          <ProductDescription data={result} />
          <ProductReview title="RELATED PRODUCT" />
        </div>
      </div>
      <Header title="RELATED PRODUCT" />
      <Product product_data={all_products} />
      <Footer />
    </div>
  );
}
