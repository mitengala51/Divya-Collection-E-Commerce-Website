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
            // srcSet="https://images.unsplash.com/photo-1502657877623-f66bf489d236?auto=format&fit=crop&w=800&dpr=2 2x"
            loading="lazy"
            // style={{objectFit: 'cover'}}
            className='img-fluid rounded-2 border-0 shadow-lg '
            alt=""
          />
        </CardCover>
        <CardContent>
          {/* <Typography
            level="body-lg"
            textColor="#fff"
            sx={{ fontWeight: 'lg', mt: { xs: 12, sm: 18 } }}
          >
            Image
          </Typography> */}
        </CardContent>
      </Card>
        <div className='d-flex flex-row justify-content-center mt-3'>
        <img src={p_1} id='p_1' className="rounded mx-2 border border-dark-subtle border-2 d-block" alt="..." width={80} height={80} onMouseEnter={()=>{ HandleMouseEnter(p_1) }}/>
        <img src={p_2} id='p_2' className="rounded mx-2 border border-dark-subtle border-2 d-block" alt="..." width={80} height={80} onMouseEnter={()=>{ HandleMouseEnter(p_2) }}/>
        <img src={p_3} id='p_3' className="rounded mx-2 border border-dark-subtle border-2 d-block" alt="..." width={80} height={80} onMouseEnter={()=>{ HandleMouseEnter(p_3) }}/>
        <img src={p_4} id='p_4' className="rounded mx-2 border border-dark-subtle border-2 d-block" alt="..." width={80} height={80} onMouseEnter={()=>{ HandleMouseEnter(p_4) }}/>
        </div>
    </div>
  )
}
