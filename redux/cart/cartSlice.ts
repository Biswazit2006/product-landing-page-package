import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICartItem } from "@/lib/interfaces";
import { IProduct } from "@/model/productModel";

const initialState: {
  cartList: ICartItem[];
  selectAll: boolean;
  loading: boolean;
} = {
  cartList: [],
  selectAll: false,
  loading: false,
};

// Async Thunk: Fetches cart from API and formats populated products into ICartItem[]
export const getCartAsync = createAsyncThunk(
  "cart/getCartAsync",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/cart", {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();

      if (
        !res.ok ||
        !data.success ||
        !data.cart ||
        !Array.isArray(data.cart.products)
      ) {
        return rejectWithValue(data.message || "Failed to fetch cart");
      }

      // Format data.cart.products into Redux ICartItem[] format
      const formattedItems: ICartItem[] = data.cart.products
        .filter((item: any) => item.productId)
        .map((item: any) => {
          const { _id, ...productData } = item.productId;
          return {
            ...productData,
            id: item.productId._id?.toString() || item.productId.id || "",
            isSelected: true,
            quantity: item.quantity,
          };
        });

      return formattedItems;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IProduct>) => {
      const newProduct: IProduct = action.payload;
      const newProductId = newProduct._id?.toString() || "";

      const existingItem = state.cartList.find(
        (item) => item.id === newProductId,
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        const { _id, ...productData } = newProduct;
        const newitem: ICartItem = {
          ...productData,
          id: newProductId,
          quantity: 1,
          isSelected: true,
        };

        state.cartList.push(newitem);
      }
    },
    deleteFromCart: (state, action: PayloadAction<string>) => {
      state.cartList = state.cartList.filter(
        (item) => item.id !== action.payload,
      );
    },
    deleteSelected: (state) => {
      state.cartList = state.cartList.filter((item) => !item.isSelected);
    },
    increaseQuantity: (state, action: PayloadAction<string>) => {
      const existingItem = state.cartList.find(
        (item) => item.id === action.payload,
      );
      if (existingItem) {
        existingItem.quantity += 1;
      }
    },
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const existingItem = state.cartList.find(
        (item) => item.id === action.payload,
      );
      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      }
    },
    selectOneToggle: (state, action: PayloadAction<string>) => {
      const existingItem = state.cartList.find(
        (item) => item.id === action.payload,
      );
      if (existingItem) {
        existingItem.isSelected = !existingItem.isSelected;
      }
    },
    selectAllToggle: (state) => {
      const nextState = !state.selectAll;
      state.selectAll = nextState;
      state.cartList.forEach((item) => {
        item.isSelected = nextState;
      });
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getCartAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getCartAsync.fulfilled,
        (state, action: PayloadAction<ICartItem[]>) => {
          state.loading = false;
          state.cartList = action.payload;
        },
      )
      .addCase(getCartAsync.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const {
  addToCart,
  deleteFromCart,
  deleteSelected,
  increaseQuantity,
  decreaseQuantity,
  selectOneToggle,
  selectAllToggle,
} = cartSlice.actions;

export default cartSlice.reducer;
