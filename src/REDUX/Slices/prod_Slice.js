import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//                                      eath reducer slicelekk aano value varendath aa slice nte name and /action products/fetchProducts
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const response = await axios.get("https://dummyjson.com/products")
    // console.log(response.data.products);
    // store all products data to the session storage , we cannot store array so convert to string.
    sessionStorage.setItem("allProducts",JSON.stringify(response.data.products))
    return response.data.products
})
export const productSlice = createSlice({
    name: 'products',
    initialState: {
        allProducts: [],
        error: "",
        loading: false
    },
    reducers: {
        searchProduct:(state,action)=>{
            state.allProducts= state.allProductsDummy.filter(item=>item.title.toLowerCase().includes(action.payload))
        }

    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.fulfilled, (state, action) => 
        {
            state.loading = false
            state.allProducts = action.payload
            state.allProductsDummy = action.payload

            state.error = ""
        })
        builder.addCase(fetchProducts.pending, (state, action) => 
        {
            state.loading = true
            state.allProducts = []
            state.error = ""
        }),
            builder.addCase(fetchProducts.rejected, (state, action) => 
            {
                state.loading = false
                state.allProducts = []
                state.error = "API call failed.. please try after some time..."
            })

    }
})
export const {searchProduct}= productSlice.actions
export default productSlice.reducer
