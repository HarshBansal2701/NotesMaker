import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";


const initialState = {
    pastes: localStorage.getItem("pastes") ? JSON.parse(localStorage.getItem("pastes")): [],
}

export const pasteSlicer = createSlice({
    name: 'paste',
    initialState,
    reducers: {
        addToPastes : (state, action) => {      

            // add a check that the title is already exist or not 

            const paste = action.payload;
            state.pastes.push(paste);

            localStorage.setItem("pastes", JSON.stringify(state.pastes));
            toast.success("Created Successfully");
        },

        updateToPastes: (state, action) =>{
            const paste = action.payload;
            const idx = state.pastes.findIndex((item) => item._id === paste._id);

            if(idx >= 0){
                state.pastes[idx] = paste;
                localStorage.setItem("pastes", JSON.stringify(state.pastes));
                toast.success("Update Successfully");
            }

        },

        resetAllPastes: (state, action) => {
            state.pastes = [];
            localStorage.removeItem("pastes");
            toast.success("All Removed Successfully")
        },

        removeFromPastes: (state, action) =>{
            const pasteId = action.payload;

            const idx = state.pastes.findIndex((item) => item._id === pasteId);

            if(idx >= 0){
                state.pastes.splice(idx,1);
                localStorage.setItem("pastes",JSON.stringify(state.pastes));
                toast.success("Paste Remove Successfully");
            }
        },
    },
})

export const { addToPastes, updateToPastes, resetAllPastes, removeFromPastes } = pasteSlicer.actions;
export default pasteSlicer.reducer