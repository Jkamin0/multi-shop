import React, { useEffect, useState } from "react";
import { Container, Grid, Button, Typography, Box } from "@mui/material";
import useApi from "../hooks/UseApi";
import ProductCard from "../components/ProductCard";

const ProductGridPage = () => {
  const [products, setProducts] = useState([]);
  const [groupedProducts, setGroupedProducts] = useState(null);
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
  }, []);

  const fetchGroupedProducts = async () => {
    setLoading(true);
    try {
      const response = await api.getPublishedProductsGroupedByType();
      const grouped = response.data?.products || {};
      const transformedGroupedProducts = Object.entries(grouped).map(
        ([type, items]) => ({ type, items })
      );
      setGroupedProducts(transformedGroupedProducts);
    } catch (error) {
      console.error("Error fetching grouped products:", error);
      setGroupedProducts([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box display="flex" justifyContent="center" gap={2} mb={4}>
        <Button
          variant="contained"
          color="primary"
          onClick={fetchGroupedProducts}
        >
          Sort by Product Type
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => setGroupedProducts(null)}
        >
          View All Products
        </Button>
      </Box>

      {groupedProducts ? (
        groupedProducts.map((group) => (
          <Box key={group.type} mb={4}>
            <Typography variant="h5" gutterBottom>
              {group.type}
            </Typography>
            <Grid container spacing={2}>
              {group.items.map((product) => (
                <Grid item xs={6} sm={4} md={3} lg={2} xl={2} key={product.id}>
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>
          </Box>
        ))
      ) : (
        <Grid container spacing={2}>
          {products.map((product) => (
            <Grid item xs={6} sm={4} md={3} lg={2} xl={2} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default ProductGridPage;
