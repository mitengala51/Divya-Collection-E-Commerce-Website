import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Chip from '@mui/joy/Chip';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
// import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
// import PI from '../assets/pi_1.jpg'
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import p_1 from '../assets/Products Images/p_1.jpg'
import p_2 from '../assets/Products Images/p_2.jpg'
import p_3 from '../assets/Products Images/p_3.jpg'
import p_4 from '../assets/Products Images/p_4.jpg'
import './Product.css'
import { height } from '@mui/system';

export default function Product() {

    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 4,
          slidesToSlide: 1 // optional, default to 1.
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2,
          slidesToSlide: 1 // optional, default to 1.
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
          slidesToSlide: 1 // optional, default to 1.
        }
      };

      const data = [
        {
          id: 1,
          product_name: "Tory Burch Classic Flip-Flop",
          price: "₹3,495",
          image_url: p_1,
        },
        {
          id: 2,
          product_name: "Prada Strappy Flat Sandal",
          price: "₹2,799",
          image_url: p_2,
        },
        {
          id: 3,
          product_name: "Gucci Inspired Gold Buckle Flats",
          price: "₹4,199",
          image_url: p_3,
        },
        {
          id: 4,
          product_name: "Black Casual Wear Sandal",
          price: "₹2,499",
          image_url: p_4,
        },
      ];

  return (
   <Carousel responsive={responsive} infinite={true} className='px-1 py-2 m-2' style={{height: '350px'}}>
    {data.map((d)=>{
        return(
            <Card key={d.id}  sx={{ width: 320, maxWidth: '100%', boxShadow: 'lg' }} className='product-card'>
            <CardOverflow>
              <AspectRatio ratio="1" sx={{ minWidth: 300}}>
                <img
                  src={d.image_url}
                  loading="lazy"
                  alt=""
                  style={{ objectFit: "cover" }}
                />
              </AspectRatio>
            </CardOverflow>
            <CardContent>
              <Typography level="body-xs">Ladies Footwear</Typography>
              <Link
                href="#product-card"
                color="neutral"
                textColor="text.primary"
                overlay
                sx={{ fontWeight: 'md', fontSize: 'large'}}
              >
                {d.product_name}
              </Link>
      
              <Typography
                level="title-lg"
                sx={{ mt: 1, fontWeight: 'xl' }}
                endDecorator={
                  <Chip component="span" size="sm" variant="soft" color="success">
                    Lowest price
                  </Chip>
                }
              >
                {d.price}
              </Typography>
              {/* <Typography level="body-sm">
                (Only <b>7</b> left in stock!)
              </Typography> */}
            </CardContent>
            <CardOverflow>
              <Button variant="solid" color="danger" size="lg" sx={{backgroundColor: '#1976d2'}}>
              <AddShoppingCartIcon />
                Add to cart
              </Button>
            </CardOverflow>
          </Card>
        )
    })}
</Carousel>


  )
}
