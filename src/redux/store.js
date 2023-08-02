import {configureStore} from "@reduxjs/toolkit"
import cartSlice from "./cardslice"
export default configureStore({
    reducer:{
        cart:cartSlice
    }
})