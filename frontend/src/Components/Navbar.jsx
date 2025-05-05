import React from "react";
import "./Navbar.css";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from "react-router";
import LoginModal from "./AuthModal";

export default function Navbar() {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

  return (
    <div className="d-flex py-4 px-5 justify-content-between shadow-sm">
      <Link to='/' className="h4 Link" style={{fontFamily: "Playwrite RO, cursive"}}>Divya Collection</Link>
      <div className="row row-cols-auto">
        <Link to='http://localhost:5173/' className="Link"><div className=" nav-links">Home</div></Link>
        <Link to='Shopping' className="Link"><div className=" nav-links">Shopping</div></Link>
        <Link to='About' className="Link"><div className=" nav-links">About</div></Link>
        <Link to='Contact-Us' className="Link"><div className="me-5 nav-links">Contact Us</div></Link>
        <div className="ps-1"><Link to='http://localhost:5173/shopping-cart'><ShoppingCartIcon sx={{color: "black", fontSize: "x-larger",cursor: "pointer"}}/></Link></div>
        <div className="ps-1"><AccountCircleIcon onClick={handleOpen} sx={{fontSize: "x-larger", cursor: "pointer"}}/></div>
        <LoginModal open={open} handleClose={handleClose}/>
      </div>
    </div>
  );
}
