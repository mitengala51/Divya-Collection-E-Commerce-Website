import React from 'react'
import Marquee from "react-fast-marquee";
import l1 from '../assets/Logo Images/l_1.png'
import l2 from '../assets/Logo Images/l_2.png'
import l3 from '../assets/Logo Images/l_3.png'
import l6 from '../assets/Logo Images/l_6.png'
import l7 from '../assets/Logo Images/l_7.png'
import './Brands.css'

export default function Brands() {
  return (
    <Marquee pauseOnHover={false} className='mb-4 mt-1 brands-div' style={{backgroundColor: '#f9fafb'}}>

      <div className='container p-3'><img src={l1} alt="any" width={300} height={100}/></div>
      <div className='container p-3'><img src={l2} alt="any" width={300} height={100}/></div>
      <div className='container p-3'><img src={l3} alt="any" width={300} height={100}/></div>
      <div className='container p-3'><img src={l6} alt="any" width={300} height={100}/></div>
      <div className='container p-3'><img src={l7} alt="any" width={300} height={100}/></div>
      {/* <div className='container'><img src={l5} alt="any" width={300} height={100}/></div> */}
      {/* <div className='container p-3'><img src={b1} alt="any" width={300} height={100}/></div> */}
         
    </Marquee>
  )
}
