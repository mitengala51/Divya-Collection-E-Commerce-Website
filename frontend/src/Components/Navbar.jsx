import React from "react";
import "./Navbar.css";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from "react-router";
import LoginModal from "./AuthModal";
import axios from "axios";
import LogoutIcon from '@mui/icons-material/Logout';
import toast, { Toaster } from "react-hot-toast";

export default function Navbar() {

    const [open, setOpen] = React.useState(false);
      const [loggedIn, setLoggedIn] = React.useState(false)

      const notify = (message) => toast.success(message);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    async function handleClick() {
      try {
        console.log('iamclicked')
        const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/api/Logout`,{
           credentials: 'same-origin'
        },{
          withCredentials: true
        })
        notify(response.data.message)
        setLoggedIn(false)
      } catch (error) {
        
      }
    }

  return (
    <div className="d-flex py-4 px-5 justify-content-between shadow-sm">
      <Link to='/' className="h4 Link" style={{fontFamily: "Playwrite RO, cursive"}}>Divya Collection</Link>
      <div className="row row-cols-auto">
        <Link to='http://localhost:5173/' className="Link"><div className=" nav-links">Home</div></Link>
        {/* <Link to='Shopping' className="Link"><div className=" nav-links">Shopping</div></Link> */}
        <Link to='http://localhost:5173/About-Us' className="Link"><div className=" nav-links">About</div></Link>
        <Link to='http://localhost:5173/Contact-Us' className="Link"><div className="me-5 nav-links">Contact Us</div></Link>
        <div className="ps-1"><Link to='http://localhost:5173/shopping-cart'><ShoppingCartIcon sx={{color: "black", fontSize: "x-larger",cursor: "pointer"}}/></Link></div>
        {loggedIn? <div className="ps-1"><LogoutIcon onClick={handleClick} sx={{fontSize: "x-larger", cursor: "pointer"}}/></div>  :  <div className="ps-1"><AccountCircleIcon onClick={handleOpen} sx={{fontSize: "x-larger", cursor: "pointer"}}/></div>}
        <LoginModal open={open} handleClose={handleClose} setLoggedIn={setLoggedIn}/>
      </div>
    </div>
  );
}

{/* <Button variant="text" onClick={handleClick} >Logout</Button> */}