import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";

const ProductCard = ({ product }) => {
  const { title, price, description, image } = product;

  return (
    <Card sx={{ maxWidth: 350 }}>
      <CardMedia component="img" height="140" image={image} alt={title} />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Typography variant="body1" color="text.primary" sx={{ mt: 1 }}>
          ${price.toFixed(2)}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
