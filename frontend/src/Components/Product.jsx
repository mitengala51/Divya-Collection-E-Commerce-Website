import React, { useEffect, useState, useContext } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Chip from "@mui/joy/Chip";
import Link from "@mui/joy/Link";
import Typography from "@mui/joy/Typography";
import axios from "axios";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import p_1 from "../assets/Products Images/p_1.jpg";
import p_2 from "../assets/Products Images/p_2.jpg";
import p_3 from "../assets/Products Images/p_3.jpg";
import p_4 from "../assets/Products Images/p_4.jpg";
import toast, { Toaster } from "react-hot-toast";
import "./Product.css";
import { Link as RouterLink } from "react-router-dom";

export default function Product() {
  const [result, setResult] = useState([]);

  var data;

  const notify = () => toast.success("Added to cart!");

  useEffect(() => {
    async function fetchdata() {
      data = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API_URL}/api/all-products`
      );
      console.log(data.data.all_products[0].image_url);
      setResult(data.data.all_products);
    }

    fetchdata();
  }, []);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1326, min: 1006 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 1006, min: 696 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
    sm: {
      breakpoint: { max: 500, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  async function handleClick(index) {
    try {
      console.log(result);
      if (result[index].length > 0) {
        return console.log("Data not found");
      }

      await axios
        .post(
          "http://localhost:3000/api/add-to-cart",
          {
            id: result[index].id,
            title: result[index].title,
            price: result[index].price,
            brand: result[index].brand,
            size: result[index].size,
            category: result[index].category,
            image_url: result[index].image_url,
          },
          {
            withCredentials: true,
          }
        )
        .then(() => {
          notify();
        });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
        <Toaster />
      <Carousel
        responsive={responsive}
        infinite={true}
        className="px-1 py-2 m-2"
        style={{ height: "350px" }}
      >
        {result.map((data, index) => {
          return (
            <Card
              key={data.id}
              sx={{ width: 300, maxWidth: "100%", boxShadow: "lg" }}
              className="product-card"
            >
              <CardOverflow>
                <AspectRatio ratio="1" sx={{ minWidth: 300 }}>
                  <img
                    src={`/Products Images/${data.image_url}.jpg`}
                    loading="lazy"
                    alt=""
                    style={{ objectFit: "cover" }}
                  />
                </AspectRatio>
              </CardOverflow>
              <CardContent>
                <Typography level="body-xs">Ladies Footwear</Typography>
                <Link
                  // href="product-detail"
                  color="neutral"
                  textColor="text.primary"
                  overlay
                  component={RouterLink}
                  to="/product-detail"
                  state={{ id: data.id }}
                  sx={{ fontWeight: "md", fontSize: "large" }}
                >
                  {data.title}
                </Link>

                <Typography
                  level="title-lg"
                  sx={{ mt: 1, fontWeight: "xl" }}
                  endDecorator={
                    <Chip
                      component="span"
                      size="sm"
                      variant="soft"
                      color="success"
                    >
                      Lowest price
                    </Chip>
                  }
                >
                  Rs {data.price}
                </Typography>
              </CardContent>
              <CardOverflow>
                <Button
                  variant="solid"
                  color="danger"
                  size="lg"
                  sx={{ backgroundColor: "#1976d2" }}
                  onClick={() => {
                    handleClick(index);
                  }}
                >
                  <AddShoppingCartIcon />
                  Add to cart
                </Button>
              </CardOverflow>
            </Card>
          );
        })}
      </Carousel>
    </>
  );
}
