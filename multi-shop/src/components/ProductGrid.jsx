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
import Cart from "../components/Cart";

const ProductGridPage = () => {
  const [products, setProducts] = useState([]);
  const [groupedProducts, setGroupedProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filteredGroupedProducts, setFilteredGroupedProducts] = useState(null);
  const [cart, setCart] = useState([]);
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

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const checkout = async () => {
    console.log("Proceeding to checkout with items:", cart);

    let updatedProducts = [...products];

    for (const cartItem of cart) {
      const updatedInventory = cartItem.inventory - cartItem.quantity;

      if (updatedInventory >= 0) {
        const productData = {
          ...cartItem,
          inventory: updatedInventory,
        };

        try {
          // Update the inventory on the backend
          await api.updateProduct(cartItem.id, productData);
          console.log(`Inventory updated for product ${cartItem.title}`);

          // Update the product in the local products state
          updatedProducts = updatedProducts.map((product) =>
            product.id === cartItem.id
              ? { ...product, inventory: updatedInventory }
              : product
          );
        } catch (error) {
          console.error(
            `Error updating inventory for product ${cartItem.title}:`,
            error
          );
        }
      } else {
        console.log(`Not enough inventory for ${cartItem.title}`);
      }
    }
    setProducts(updatedProducts);
    clearCart();
  };

  const filterProducts = () => {
    const searchTermLower = searchTerm.toLowerCase();

    if (searchTerm) {
      const filtered = products.filter((product) => {
        const title = String(product?.title || "").toLowerCase();
        const description = String(product?.description || "").toLowerCase();
        return (
          title.includes(searchTermLower) ||
          description.includes(searchTermLower)
        );
      });
      setFilteredProducts(filtered);

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
    <Container
      maxWidth={false}
      sx={{ py: 4, display: "flex", gap: 2, width: "100%" }}
    >
      <Box flex={3} sx={{ width: "100%" }}>
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
                    <ClearIcon
                      sx={{ cursor: "pointer" }}
                      onClick={clearSearch}
                    />
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
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    xl={3}
                    key={product.id}
                  >
                    <ProductCard
                      product={product}
                      onAddToCart={() => addToCart(product)}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          ))
        ) : (
          <Grid container spacing={2}>
            {filteredProducts.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={product.id}>
                <ProductCard
                  product={product}
                  onAddToCart={() => addToCart(product)}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      <Box flex={1}>
        <Cart
          cartItems={cart}
          removeFromCart={removeFromCart}
          clearCart={clearCart}
          checkout={checkout}
        />
      </Box>
    </Container>
  );
};

export default ProductGridPage;
