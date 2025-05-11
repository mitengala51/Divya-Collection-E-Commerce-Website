import React, { useEffect, useState, useContext } from 'react'
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
import axios from 'axios'
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import p_1 from '../assets/Products Images/p_1.jpg'
import p_2 from '../assets/Products Images/p_2.jpg'
import p_3 from '../assets/Products Images/p_3.jpg'
import p_4 from '../assets/Products Images/p_4.jpg'
import './Product.css'
import { Link as RouterLink } from 'react-router-dom'

export default function Product() {

    const [result, setResult] = useState([])

    var data;

    useEffect(()=>{
      async function fetchdata(){
        data = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/all-products`)
       console.log(data.data.all_products[0].image_url)
       setResult(data.data.all_products)
      }

      fetchdata()
    },[])

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

  return (
   <Carousel responsive={responsive} infinite={true} className='px-1 py-2 m-2' style={{height: '350px'}}>
    {result.map((data)=>{
        return(
            <Card key={data.id}  sx={{ width: 320, maxWidth: '100%', boxShadow: 'lg' }} className='product-card'>
            <CardOverflow >
              <AspectRatio ratio="1" sx={{ minWidth: 300}}>
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
                to='/product-detail'
                state={{id: data.id}}
                sx={{ fontWeight: 'md', fontSize: 'large'}}
              >
                {data.title}
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
                Rs {data.price}
              </Typography>
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
