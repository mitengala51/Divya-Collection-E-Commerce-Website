import React from "react";
import "./Navbar.css";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from "react-router";

export default function Navbar() {
  return (
    <div className="d-flex py-4 px-5 justify-content-between">
      <h4 className="h4">Divya Collection</h4>
      <div className="row row-cols-auto">
        <Link to='about' className="Link"><div className=" nav-links">Home</div></Link>
        <Link to='Shopping' className="Link"><div className=" nav-links">Shopping</div></Link>
        <Link to='About' className="Link"><div className=" nav-links">About</div></Link>
        <Link to='Contact-Us' className="Link"><div className="me-5 nav-links">Contact Us</div></Link>
        <div className="ps-1"><ShoppingCartIcon sx={{color: "black", fontSize: "x-larger",cursor: "pointer"}}/></div>
        <div className="ps-1"><AccountCircleIcon sx={{fontSize: "x-larger", cursor: "pointer"}}/></div>
      </div>
    </div>
  );
}
