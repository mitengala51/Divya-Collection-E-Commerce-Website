import React from "react";
import CardContent from "@mui/joy/CardContent";
import CardCover from "@mui/joy/CardCover";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";

export default function AboutUs() {
  return (
    <div className="row px-xl-5 py-4 mx-sm-5 mx-2">
      <div className="col-12">
        <h1 className="text-center pb-4">About My Divya Collection</h1>
      </div>
      <div className="row justify-content-center align-items-center" >
        <div className="col-lg-6">
                 <Card component="li" sx={{ minWidth: '50%', minHeight: '300px', flexGrow: 1 }}>
          <CardCover>
            <img
              src="https://images.unsplash.com/photo-1502657877623-f66bf489d236?auto=format&fit=crop&w=800"
              srcSet="https://images.unsplash.com/photo-1502657877623-f66bf489d236?auto=format&fit=crop&w=800&dpr=2 2x"
              loading="lazy"
              alt=""
            />
          </CardCover>
          <CardContent>
            <Typography
              level="body-lg"
              textColor="#fff"
              sx={{ fontWeight: "lg", mt: { xs: 12, sm: 18 } }}
            >
              Image
            </Typography>
          </CardContent>
        </Card>
        </div>
 

        <div className="col-lg-6">
          <p className="fs-5 fw-normal">
            Welcome to <strong>My Divya Collection</strong> — your one-stop shop for elegant,
            affordable, and trendy products. We are passionate about offering
            you the best in fashion, accessories, and lifestyle products. <br></br><br></br> Since
            our inception, we've served thousands of happy customers and
            continue to grow with love and trust. Each product we offer is
            carefully curated to bring value and beauty into your life.
          </p>
        </div>
      </div>

      <div className="row mt-5">
        <div className=" col-lg-4 text-center">
            <h3 style={{color: '#007bff'}}>Our Mission</h3>
            <p className="">To provide top-quality, affordable products <br></br> that bring joy and satisfaction to our <br></br> customers.</p>
        </div>
        <div className="col-lg-4 text-center">
            <h3 style={{color: '#007bff'}}>Our Vision</h3>
            <p>To become a leading brand known for trust, <br></br> innovation, and customer care in the e- <br></br> commerce space.</p>
        </div>
        <div className="col-lg-4  text-center">
            <h3 style={{color: '#007bff'}}>Why Choose Us?</h3>
            <p>Fast delivery, customer-first approach, easy <br></br> returns, and products you’ll love!</p>
        </div>
      </div>
    </div>
  );
}
