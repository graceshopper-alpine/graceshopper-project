import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const fetchSingleProduct = createAsyncThunk(
    'singleProduct', async(id) => {
        try {
            const response = await axios.get(`/api/products/${id}`)
            return response.data
        } catch (error) {
            
        }
    }
)

export const deleteProduct = async (productID) => {
    try {
        const response = await axios.delete(`/api/products/${productId}`);
        return response.data;
    } catch (error) {
        console.error(("Error deleting product: ", error));
    }
}

const singleProductSlice = createSlice({
    name: 'singleProduct',
    initialState: {
        singleProduct: {},
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchSingleProduct.fulfilled, (state, action) => {
            state.singleProduct = action.payload
        })
        builder.addCase(addNewProduct.fulfilled, (state, action) => {
            state.push(action.payload)
          })
    }
})

export default singleProductSlice.reducer