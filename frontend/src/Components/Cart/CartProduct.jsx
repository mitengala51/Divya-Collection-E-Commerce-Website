import { useState } from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

export default function CartProduct({ id ,title, price, brand, image_url, cartDeleted , setCartDeleted, totalPrice,setTotalPrice, OrderQuantity, setOrderQuantity }) {

  const [quantity, setQuantity] = useState(1);
  const [Cartprice, setCartPrice] = useState(price);

  let unitQuantity = quantity

  async function deleteItem(){
    try {
      // console.log(id)
      const response = await axios.delete(`${import.meta.env.VITE_REACT_APP_API_URL}/api/delete-cart-item/` + id)
      // console.log(response)

      if(response.status == 200){
        setCartDeleted(!cartDeleted)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="p-3 d-flex flex-column flex-md-row gap-3 justify-content-between bg-body-tertiary rounded-3 shadow mb-3">
      <div className="d-flex flex-row gap-3">
        <div>
        <img
          src={`/Products Images/${image_url}.jpg`}
          width={100}
          height={100}
          className="object-fit-cover rounded"
          style={{maxWidth: '100px', height: '100px'}}
        />
      </div>

      <div className="d-flex flex-column gap-1">
        <h5 className="mb-0">{title}</h5>
        <p className="fs-6 mb-1" style={{ color: "#666666" }}>
          Brand: {brand}
        </p>
        <p>
          <strong className="fs-sm-5 fs-6">Rs {price}</strong>
        </p>
        <div className="d-flex gap-3">
          <Button
            variant="text"
            onClick={() => {
              if (quantity <= 1) {
                setQuantity(1);
              } else {
                setQuantity(quantity => quantity - 1);
                setOrderQuantity(oq => oq - 1)
                // console.log(quantity)
                setCartPrice(Cartprice => Cartprice - price);
                setTotalPrice(totalPrice - price)
              }
            }}
            sx={{ padding: "0", width: "2px", height: "30px" }}
          >
            <RemoveIcon />
          </Button>
          <p className="fs-5">{quantity}</p>

          <Button
            variant="text"
            onClick={() => {
              // console.log("Props Price: " + price)
              setQuantity(q => q + 1);
              setOrderQuantity(oq => oq + 1)
              // console.log(quantity)
              unitQuantity = unitQuantity + 1
              // console.log("UnitQuantity Variable: " + unitQuantity)
              setCartPrice(price * unitQuantity);
              setTotalPrice(totalPrice + price)
            }}
            sx={{ padding: "0", width: "2px", height: "30px" }}
          >
            <AddIcon />
          </Button>
        </div>

        <div className="d-flex gap-5">
          <h5 className="h5">Total: {Cartprice}</h5>
        </div>
      </div>
      </div>
      
      {/* <div className="float-end"> */}
        {" "}
        <Button
          variant="contained"
          color="error"
          className="align-self-sm-end"
          startIcon={<DeleteIcon />}
          onClick={deleteItem}
        >
          Delete
        </Button>
      {/* </div> */}
    </div>
  );
}
