import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";

const ProductCard = ({ product, onAddToCart }) => {
  const { title, price, image, inventory } = product;

  return (
    <Card className="flex flex-col h-full max-w-sm">
      <CardMedia
        component="img"
        height="140"
        image={image}
        alt={title}
        className="object-cover"
      />
      <CardContent className="flex-grow flex flex-col justify-between p-4">
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          className="break-words"
        >
          {title}
        </Typography>
        <Typography variant="body1" color="text.primary" className="mt-2">
          ${price.toFixed(2)}
        </Typography>
        {inventory > 0 && (
          <Typography variant="body2" color="text.primary" className="mt-2">
            Inventory: {inventory}
          </Typography>
        )}
      </CardContent>
      <CardActions className="p-4">
        <Button
          size="small"
          color="primary"
          onClick={onAddToCart}
          disabled={inventory <= 0}
          className="w-full"
        >
          {inventory > 0 ? "Add to Cart" : "Out of Stock"}
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
