import express from "express";
import Razorpay from "razorpay";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

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

const UserSchema = new mongoose.Schema({
  // user_id: String,
  first_name: String,
  last_name: String,
  email: String,
  password: String,
  name: String,
  phone_number: Number,
  address: String,
  // username: String
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

const Product = mongoose.model("Products", ProductSchema, "Products");
const User = mongoose.model("Users", UserSchema, "Users");
const Cart = mongoose.model("Cart", CartSchema, "Cart");

const app = express();
app.use(cors());
app.use(express.json());

const razorpay = new Razorpay({
  key_id: "rzp_test_pT0cCmRBjU9jLL",
  key_secret: "RSlwcMyxMmxMPkvYw2GMFLcA",
});

//  Fetching All Products from Database

app.get("/api/all-products", async (req, res) => {
  try {
    const all_products = await Product.find({});
    console.log(all_products);
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

app.post('/api/add-to-cart', async (req,res)=>{
  try {
  const { id, title, price, brand, size, category, image_url } = req.body;
  console.log(id, title, price, brand, size, category, image_url)
  await Cart.create({ id, title, price, brand, size, category, image_url })
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
    const { username, Inputpassword } = req.body;
    console.log(username, Inputpassword);
    const user = await User.find({ username: username });
    console.log(user.length);

    if (user.length == 0) {
      console.log("User not found");
      res.status(404).json({ message: "User not found" });
    }

    const HashedPassword = await User.find({ password: Inputpassword });
    const password = await bcrypt.compare(Inputpassword, HashedPassword);

    if (password) {
      res.status(200).json({ message: "Login Successfull" });
    } else {
      res.status(400).json({ message: "Login Fail" });
    }
  } catch (error) {
    res.json({ error });
  }
});

//Sign Up Endpoint

app.post('/api/sign-up', async (req,res)=>{
  try {
    const { first_name , last_name, email , password } = req.body;
  console.log( first_name , last_name, email , password )
  await User.create({ first_name , last_name, email , password })

  res.json({message: 'Account create successfully'})
  } catch (error) {
    console.log(error)
    res.json({error: error})
  }

})

app.listen(3000, () => {
  console.log("Server is Listinening to port 3000");
});
