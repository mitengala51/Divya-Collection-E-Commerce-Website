import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/footer";
import CartProduct from "../Components/CartProduct";
import TotalCartTable from "../Components/TotalCartTable";
import axios from "axios";

export default function ShoppingCartPage() {

    const [cartItems, setCartItems] = useState([])
    const [totalPrice, setTotalPrice] = useState([])

    useEffect(()=>{
      async function fetchdata(){
        try {
        const data = await axios.get('http://localhost:3000/api/cart-items')
        console.log(data.data.all_cart_items)
        console.log(data.data.all_cart_items.length)
        setCartItems(data.data.all_cart_items)

        const cost = data.data.all_cart_items.reduce((accumulator, item)=>accumulator + item.price,0)

        console.log(cost)

        setTotalPrice(cost)

        } catch (error) {
          
        }

      }

      fetchdata()
    },[])

  return (
    <div>
      <Navbar />
      <div className="p-5">
        <div className="">
          <h1 className="h2 text-center">Your Shopping Cart</h1>
          <p className="text-center">You have {cartItems.length} items in your cart</p>
        </div>

        <div className="row">
          <div className="col-lg-8">
            {cartItems.map((data)=>{
              return  <CartProduct key={data.id} title={data.title} price={data.price} brand={data.brand} image_url={data.image_url}/>
            })}
            </div>
          <div className="col-lg-4">
            <TotalCartTable totalItems={cartItems.length} price={totalPrice}/>
            </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
