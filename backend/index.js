import express from "express";
import Razorpay from "razorpay";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken'
import cookieParser from "cookie-parser";

dotenv.config()

mongoose
  .connect(
    "mongodb+srv://mitengala51:pass123@cluster0.9ew96yf.mongodb.net/Divya-Collection-E-commerce?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected to MongoDb");
  });

const ProductSchema = new mongoose.Schema({
  id: String,
  title: String,
  price: Number,
  short_description: String,
  detail_description: String,
  category: String,
  brand: String,
  size: Number,
  image_url: String,
});

const CartSchema = new mongoose.Schema({
  id: String,
  title: String,
  price: Number,
  category: String,
  brand: String,
  size: Number,
  image_url: String,
})

const UserSchema = new mongoose.Schema({
  // user_id: String,
  full_name: String,
  first_name: String,
  last_name: String,
  email: String,
  password: String,
  name: String,
  phone_number: Number,
  address: String,
  city: String,
  state: String,
  zip_code: Number,
  Google_Login: Boolean,
  // username: String
  // cart: [CartSchema]
});


const Product = mongoose.model("Products", ProductSchema, "Products");
const User = mongoose.model("Users", UserSchema, "Users");
const Cart = mongoose.model("Cart", CartSchema, "Cart");

const app = express();
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true                 
}));
app.use(express.json());
app.use(cookieParser())

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

function verifyToken(req,res,next){
  const token = req.cookie.token

  if(!token){
    res.status(404).json({ message: 'Token not found' })
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY)
    req.user = decoded
    res.status(200).json({ message: 'User Authenticated', user_id: decoded._id, user_full_name: decoded.full_name })
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }

  next()

}

const razorpay = new Razorpay({
  key_id: process.env.RAZOR_PAY_KEY_ID,
  key_secret: process.env.RAZOR_PAY_KEY_SECRET,
});

//  Fetching All Products from Database

app.get("/api/all-products", async (req, res) => {
  try {
    const all_products = await Product.find({});
    // console.log(all_products);
    res.status(200).json({ all_products });
  } catch (err) {
    console.log(err);
  }
});

// Fetching Specific Product

app.get("/api/all-products/:id", async (req, res) => {
  try {
    const id  = req.params.id
    console.log(id)
    const Specific_product = await Product.find({id: id});
    console.log(Specific_product);
    res.status(200).json({ Specific_product });
  } catch (err) {
    console.log(err);
  }
});

// Add to Cart

app.post('/api/add-to-cart' ,async (req,res)=>{
  try {
    // console.log(req.user)
  const { id, title, price, brand, size, category, image_url } = req.body;
  console.log(id, title, price, brand, size, category, image_url)
  await Cart.create( { id, title, price, brand, size, category, image_url })
  res.json({message: 'Added to cart'})
  } catch (error) {
    console.log(error)
  }
})

// All Add to Cart items 

app.get('/api/cart-items', async (req,res)=>{
  try {
  const all_cart_items = await Cart.find({})
  res.json({message: 'All carts products recieved', all_cart_items})
  } catch (error) {
    console.log(error)
  }
})

// Delete Cart Items

app.delete('/api/delete-cart-item/:id', async (req,res)=>{
  console.log(req.params.id)
  try {
  const id = req.params.id
  if(!id){ return res.status(404).json({ message: 'id not found' }) }
  await Cart.deleteOne({ id })
  res.status(200).json({ message: 'Cart item removed' })
  } catch (error) {
    console.log(error)
  }

})

// Razorpay API EndPoints

app.post("/create-order", async (req, res) => {
  console.log(req.body.amount)
  try {
    const options = {
      amount: req.body.amount,
      currency: "INR",
      reciept: "receipt_" + Math.random().toString(36).substring(7),
      // payment_capture: 1,
    };

    const orders = await razorpay.orders.create(options);
    res.status(200).json({ orders });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/verify-payment", async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", key_secret)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      // Payment is verified
      res.status(200).json({ message: "Payment verified successfully" });
    } else {
      res.status(400).json({ error: "Invalid payment signature" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login & SignUp Endpoints

//Login Endpoint

app.post("/api/login", async (req, res) => {
  try {
    const { email, Inputpassword } = req.body;
    console.log(email, Inputpassword);
    const user = await User.find({ email: email });
    console.log(user)
    console.log(user.length);

    if (user.length == 0) {
      console.log("User not found");
      res.status(404).json({ message: "User not found" });
    }

    const HashedPassword = user[0].password
    const password = await bcrypt.compare(Inputpassword, HashedPassword);

    console.log(password)

    if (password) {
      const token = jwt.sign({ _id: user._id, full_name: user.full_name }, JWT_SECRET_KEY, { expiresIn: '1h' } )
      res.cookie('token', token, {
        httpOnly: true,
        maxAge: 3600000,
        secure: false
      })
      res.status(200).json({ message: "Login Successfull" });
    } else if(!password){
      res.status(400).json({ message: "Password didn't match" });
    }
  } catch (error) {
    // res.stajson({ error });
  }
});

//Sign Up Endpoint

app.post('/api/sign-up', async (req,res)=>{
  try {
    const { email , password } = req.body;
  console.log( email , password )
  const HashedPassword = await bcrypt.hash(password, 10)
  await User.create({ email , password: HashedPassword, Google_Login: false })

  res.status(200).json({message: 'Account create successfully'})
  } catch (error) {
    console.log(error)
    res.json({error: error})
  }

})

// Complete Profile endpoints

app.post('/api/complete-profile', async (req,res)=>{

  try {
  const { first_name, last_name, phone_number, address_1, address_2, city, state, zip_code, email } = req.body
  console.log(first_name, last_name, phone_number, address_1, address_2, city, state, zip_code, email)
  await User.findOneAndUpdate({email}, { first_name, last_name, phone_number, address_1, address_2, city, state, zip_code })
  res.status(200).json({ message: 'Profile Completed' })
  } catch (error) {
    console.log(error)
  }

})

// Google Auth

app.post('/api/google-login', async (req,res)=>{
  const { name, email } = req.body
  console.log(name, email)
  const user = await User.findOne({ full_name: name , email, Google_Login: true })
  if(!user){
    res.status(404).json({message: 'Sign Up with Google Account'})
  }
  const token = jwt.sign({ _id: user._id, full_name: user.full_name }, JWT_SECRET_KEY, { expiresIn: '1h' } )
  res.cookie('token', token, {
    httpOnly: true,
    maxAge: 3600000,
    secure: false
  })
  res.status(200).json({ message: 'Login Successfull' })
})

app.post('/api/google-signup', async (req,res)=>{
  const { name, email } = req.body
  console.log(name, email)
  await User.create({ full_name: name , email, Google_Login: true })
  res.status(200).json({ message: 'Google Account Signed In' })
})

// Logout
app.post('/api/Logout', verifyToken  ,(req,res)=>{
  console.log(req.user)
  res.clearCookie('token');
  res.status(200).json({ message: 'User Logged Out Successfully' })
})

app.listen(3000, () => {
  console.log("Server is Listinening to port 3000");
});
