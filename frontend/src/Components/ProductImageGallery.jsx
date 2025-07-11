import React, { useState } from 'react'
import p_1 from '../assets/Products Images/p_1_resize.jpg'
import p_2 from '../assets/Products Images/p_2.jpg'
import p_3 from '../assets/Products Images/p_3.jpg'
import p_4 from '../assets/Products Images/p_4.jpg'
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import './ProductImageGallery.css'

export default function ProductImageGallery({image_url}) {

  const [img, setImg] = useState(p_1)

  function HandleMouseEnter(x){
    setImg(x)
  }

  return (
    <div>
      <Card component="li" sx={{ minWidth: 300, flexGrow: 1, minHeight: '500px' }}>
        <CardCover sx={{minHeight: '500px'}}>
          <img
            src={img}
            loading="lazy"
            className='img-fluid rounded-2 border-0 shadow-lg '
            alt="product_images"
          />
        </CardCover>
        <CardContent>
        </CardContent>
      </Card>
        <div className='d-flex flex-row justify-content-center mt-3'>
        <img src={p_1} id='p_1' className="rounded mx-sm-2 ml-1 border border-dark-subtle border-2 d-block" alt="..." width={80} height={80} onMouseEnter={()=>{ HandleMouseEnter(p_1) }}/>
        <img src={p_2} id='p_2' className="rounded mx-sm-2 mx-1 border border-dark-subtle border-2 d-block" alt="..." width={80} height={80} onMouseEnter={()=>{ HandleMouseEnter(p_2) }}/>
        <img src={p_3} id='p_3' className="rounded mx-sm-2 mx-1 border border-dark-subtle border-2 d-block" alt="..." width={80} height={80} onMouseEnter={()=>{ HandleMouseEnter(p_3) }}/>
        <img src={p_4} id='p_4' className="rounded mx-sm-2 mr-1 border border-dark-subtle border-2 d-block" alt="..." width={80} height={80} onMouseEnter={()=>{ HandleMouseEnter(p_4) }}/>
        </div>
    </div>
  )
}
