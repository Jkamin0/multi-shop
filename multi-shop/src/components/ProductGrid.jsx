import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
} from "@mui/material";
import useApi from "../hooks/UseApi";

const ProductGridPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const api = useApi();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.getAllPublishedProducts();
        const productList = response.data?.products || [];
        setProducts(productList);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [api]);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <Typography variant="h6" align="center" style={{ marginTop: "20px" }}>
        No products available.
      </Typography>
    );
  }

  return (
    <Grid container spacing={3} padding={2} justifyContent="center">
      {products.map((product) => {
        const { id, title, description, price, image } = product;

        return (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={image}
                alt={title || "Product image"}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {title || "Untitled Product"}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {description || "No description available."}
                </Typography>
                <Typography variant="subtitle1" color="primary">
                  {price !== undefined
                    ? `$${price.toFixed(2)}`
                    : "Price not set"}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default ProductGridPage;
