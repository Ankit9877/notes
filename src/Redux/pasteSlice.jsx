import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'
const initialState = {
  pastes: localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes"))
    : []
}

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addToPastes: (state, action) => {
      const paste = action.payload;
      // if(paste==localStorage.getItem("pastes",)){
      //   toast("same note already exist")
      // }
      const title = state.pastes.findIndex((item) => item.title === paste.title);
      if(title>=0){
        toast("same note already exist");
      }
      else{
      state.pastes.push(paste);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      JSON.stringify(state.pastes);
      toast("paste created succesfully");
      }

    }
    ,
    updateToPastes: (state, action) => {
      const paste = action.payload;
      const index = state.pastes.findIndex((item) => item._id === paste._id);
      if (index >= 0) {
        state.pastes[index]=paste;
        localStorage.setItem("pastes", JSON.stringify(state.pastes));

        toast.success("Paste updated Succesfully");
      }
    },
    resetAllPastes: (state, action) => {
      const paste = action.payload;
      state.pastes=[];
      localStorage.removeItem("pastes");
    },
    removePaste: (state, action) => {
     const pasteId =action.payload;
     const index =state.pastes.findIndex((item)=>
      item._id===pasteId);
     if(index>=0){
      state.pastes.splice(index,1);
      localStorage.setItem("pastes",JSON.stringify(state.pastes));

      toast("Note deleted succesfully");
     }
    },
  },
})

// Action creators are generated for each case reducer function
export const { addToPastes, updateToPastes, resetAllPastes, removePaste,} = pasteSlice.actions

export default pasteSlice.reducer