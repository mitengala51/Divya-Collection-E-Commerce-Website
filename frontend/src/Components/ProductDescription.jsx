import React, { useContext, useEffect } from "react";
import Button from "@mui/joy/Button";
import axios from "axios";
import { Link } from "react-router";
import toast, { Toaster } from 'react-hot-toast';

export default function ProductDescription({ data }) {

      const notify = () => toast.success('Added to cart!');

  async function handleClick() {
    try {
      if (data.length > 0) {
        return console.log("Data not found");
      }

      await axios.post("http://localhost:3000/api/add-to-cart", {
        id: data.id,
        title: data.title,
        price: data.price,
        brand: data.brand,
        size: data.size,
        category: data.category,
        image_url: data.image_url,
      },{
        withCredentials: true
      }).then(()=>{
        notify()
      });
    } catch (error) {}
  }

  const style = {
    color: "#595c5f",
  };

  return (
    <div className="col">
         <Toaster />
      <p className="col h1">{data.title}</p>
      <p className="col h2">Rs {data.price}</p>
      <p className="col pt-2" style={style}>
        {data.short_description}
      </p>
      <div className="col">
        <p className="col h5 my-4">
          Category: <span className="fw-normal">{data.category}</span>
        </p>
        <p className="col h5 my-4">
          Brand: <span className="fw-normal">{data.brand}</span>
        </p>
        <p className="col h5 my-4">
          Size: <span className="fw-normal">{data.size}</span>
        </p>
      </div>
      <p className="col h4">Detailed Description</p>
      <p className="col" style={style}>
        {data.detail_description}
      </p>
      <div className="col">
        {" "}
          <Button
            size="lg"
            sx={{ backgroundColor: "#1976d2", padding: "12px 30px 12px 30px" }}
            className="fs-5 fw-normal my-2"
            onClick={handleClick}
          >
            Add to cart
          </Button>
      </div>
    </div>
  );
}
