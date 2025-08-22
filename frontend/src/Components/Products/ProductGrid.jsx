import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Chip from "@mui/joy/Chip";
import Link from "@mui/joy/Link";
import Typography from "@mui/joy/Typography";
import { Link as RouterLink } from "react-router-dom";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";


export default function ProductGrid(props) {

  if (props.spinner) {
    return (
      <div className="d-flex justify-content-center">
        <div
          className="spinner-border"
          style={{ width: "3rem", height: "3rem" }}
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (

      <div className="gap-4 row row-cols-auto justify-content-center px-2 product-grid">

        {props.products.map((data, index) => {
          return (
            <div key={data.id} className="col">
              <Card
                key={data.id}
                sx={{ width: 300, maxWidth: "100%", boxShadow: "lg" }}
                className="product-card"
              >
                <CardOverflow>
                  <AspectRatio ratio="1" sx={{ maxWidth: 300 }}>
                    <img
                      src={`/Products Images/${data.image_url[0]}.jpg`}
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
            </div>
          );
        })}
      </div>

  );
}
