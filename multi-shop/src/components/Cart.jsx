import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const Cart = ({ cartItems, removeFromCart, clearCart, checkout }) => {
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <Box
      sx={{
        p: 2,
        border: "1px solid",
        borderRadius: 2,
        maxWidth: 300,
        position: "sticky",
        top: 20,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Cart
      </Typography>
      {cartItems.length > 0 ? (
        <List>
          {cartItems.map((item) => (
            <ListItem
              key={item.id}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => removeFromCart(item.id)}
                >
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText
                primary={item.title}
                secondary={`Quantity: ${item.quantity}, Price: $${item.price}`}
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="body2" color="textSecondary">
          Your cart is empty.
        </Typography>
      )}
      <Typography variant="subtitle1" sx={{ mt: 2 }}>
        Total: ${totalPrice.toFixed(2)}
      </Typography>
      <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={checkout}
          disabled={cartItems.length === 0}
        >
          Checkout
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={clearCart}
          disabled={cartItems.length === 0}
        >
          Clear Cart
        </Button>
      </Box>
    </Box>
  );
};

export default Cart;
