import React, { useEffect, useState } from "react";
import p_1 from "../assets/Products Images/p_1.jpg";
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

export default function CartProduct({ title, price, brand, image_url }) {

  // console.log(price)

    const [counter, setCounter] = useState(1)
    const [Cartprice, setCartPrice] = useState(price)

  return (
    <div className="p-3 d-flex flex-row gap-3 bg-body-tertiary w-100 rounded-3 shadow mb-3">
      <div>
        <img src={`/Products Images/${image_url}.jpg`} width={100} height={100} className="object-fit-cover rounded" />
      </div>

      <div className="d-flex flex-column gap-1">
        <h5 className="mb-0">{title}</h5>
        <p className="fs-6 mb-1" style={{color: '#666666'}}>Brand: {brand}</p>
        <p>
          <strong className="fs-5">Rs {price}</strong>
        </p>
        <div className="d-flex gap-3">
        <Button variant="text" onClick={()=>{            
            if(counter <= 1){
                setCounter(1)
            }else{
                setCounter(counter-1)
                setCartPrice(price/counter)
            }
            }} sx={{padding: '0', width: '2px', height: '30px'}}><RemoveIcon /></Button>
          <p className="fs-5">{counter}</p>

          <Button variant="text" onClick={()=>{
            setCounter(counter+1);
            setCartPrice(price*counter)
            }} sx={{padding: '0', width: '2px', height: '30px'}}><AddIcon /></Button>
        </div>

        <div className="d-flex gap-5">
          <h5 className="h5">Total: {Cartprice}</h5>
          {/* <IconButton aria-label="delete">
        <DeleteIcon />
      </IconButton> */}
        </div>
      </div>
    </div>
  );
}
