import React, { useEffect, useState } from "react";
import { useRazorpay } from "react-razorpay";

export default function TotalCartTable({ totalItems, price }) {

  const [totalPrice, setTotalPrice] = useState(0)
  console.log(price)

  const {Razorpay} = useRazorpay();

  const RAZORPAY_KEY_ID = 'rzp_test_pT0cCmRBjU9jLL';

  const handlePayment = async () => {
    try {
      // Make the API call to backend
      const response = await fetch("http://localhost:3000/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: price * 100 }),
      });

      const order = await response.json();
      console.log(order)
    // add option for the payment gateway it can be dynamic if you want 
    // we can use prop drilling to make it dynamic
      const options = {
        key: RAZORPAY_KEY_ID,
        amount: price * 100,
        currency: order.currency,
        name: "Divya Collection", // Add company details
        description: "Payment for your order", // Add order details
        order_id: order.id,
        // this is make function which will verify the payment
        // after making the payment 
        handler: async (response) => {
          try {
            await fetch("http://localhost:3000/verify-payment", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
            
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });
            // Add onPaymentSuccessfull function here
            alert("Payment successful!");
          } catch (err) {
            // Add onPaymentUnSuccessfull function here
            alert("Payment failed: " + err.message);
          }
        },
        prefill: {
          name: "John Doe", // add customer details
          email: "john@example.com", // add customer details
          contact: "9999999999", // add customer details
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
    // you can change the gateway color from here according to your
    // application theme
          color: "#3399cc",
        },
      };
      const rzpay = new Razorpay(options);
      // this will open razorpay window for take the payment in the frontend
      // under the hood it use inbuild javascript windows api 
      rzpay.open(options);
    } catch (err) {
      alert("Error creating order: " + err.message);
    }
  };

  return (
    <div className="p-3 shadow rounded-3">
      <h1 className="h4" style={{fontFamily: "Playwrite RO, cursive"}}>Cart Summary</h1>

      <div className="d-flex justify-content-between">
        <p>Subtotal ({totalItems} items)</p>
        <p>{price}</p>
      </div>

      <div className="d-flex justify-content-between">
        <p>Shipping</p>
        <p>Free</p>
      </div>

      <hr></hr>

      <div className="d-flex justify-content-between">
        <p>Total Amount</p>
        <p>Rs {price}</p>
      </div>

      <div className="d-grid gap-2 col-12 mx-auto">
        <button className="btn btn-primary" type="button" onClick={handlePayment}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
