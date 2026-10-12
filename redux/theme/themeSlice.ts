import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
    name:'theme',
    initialState:{
        value:'light'
    },
    reducers:{
        switchDark:(state)=>{
            state.value = 'dark'
        },
        switchLight:(state)=>{
            state.value = 'light'
        },
        switchSystem:(state)=>{
            state.value = 'system'
        }
    }
})

export default themeSlice.reducer
export const {switchDark , switchLight , switchSystem} = themeSlice.actions