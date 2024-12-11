import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Button,
  Typography,
  Box,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import useApi from "../hooks/UseApi";
import ProductCard from "../components/ProductCard";

const ProductGridPage = () => {
  const [products, setProducts] = useState([]);
  const [groupedProducts, setGroupedProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filteredGroupedProducts, setFilteredGroupedProducts] = useState(null);
  const api = useApi();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.getAllPublishedProducts();
        const productList = response.data?.products || [];
        setProducts(productList);
        setFilteredProducts(productList);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
        setFilteredProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filterProducts = () => {
    const searchTermLower = searchTerm.toLowerCase();

    if (searchTerm) {
      // Filter for flat products
      const filtered = products.filter((product) => {
        const title = String(product?.title || "").toLowerCase();
        const description = String(product?.description || "").toLowerCase();
        return (
          title.includes(searchTermLower) ||
          description.includes(searchTermLower)
        );
      });
      setFilteredProducts(filtered);

      // Filter for grouped products if present
      if (groupedProducts) {
        const filteredGrouped = groupedProducts
          .map((group) => ({
            ...group,
            items: group.items.filter((product) => {
              const title = String(product?.title || "").toLowerCase();
              const description = String(
                product?.description || ""
              ).toLowerCase();
              return (
                title.includes(searchTermLower) ||
                description.includes(searchTermLower)
              );
            }),
          }))
          .filter((group) => group.items.length > 0);
        setFilteredGroupedProducts(filteredGrouped);
      }
    } else {
      // Reset filters when search term is cleared
      setFilteredProducts(products);
      setFilteredGroupedProducts(groupedProducts);
    }
  };

  useEffect(() => {
    filterProducts();
  }, [searchTerm, products, groupedProducts]);

  const fetchGroupedProducts = async () => {
    setLoading(true);
    try {
      const response = await api.getPublishedProductsGroupedByType();
      const grouped = response.data?.products || {};
      const transformedGroupedProducts = Object.entries(grouped).map(
        ([type, items]) => ({ type, items })
      );
      setGroupedProducts(transformedGroupedProducts);
      setFilteredGroupedProducts(transformedGroupedProducts);
    } catch (error) {
      console.error("Error fetching grouped products:", error);
      setGroupedProducts([]);
      setFilteredGroupedProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={2}
        mb={4}
      >
        <Box
          display="flex"
          justifyContent="center"
          gap={2}
          width="100%"
          maxWidth={600}
        >
          <TextField
            fullWidth
            variant="outlined"
            label="Search Products"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: searchTerm && (
                <InputAdornment position="end">
                  <ClearIcon sx={{ cursor: "pointer" }} onClick={clearSearch} />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Box display="flex" justifyContent="center" gap={2}>
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
            onClick={() => {
              setGroupedProducts(null);
              setFilteredGroupedProducts(null);
              clearSearch();
            }}
          >
            View All Products
          </Button>
        </Box>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" width="100%">
          <Typography variant="h6" color="textSecondary">
            Loading products...
          </Typography>
        </Box>
      ) : groupedProducts ? (
        filteredGroupedProducts &&
        filteredGroupedProducts.map((group) => (
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
          {filteredProducts.map((product) => (
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
