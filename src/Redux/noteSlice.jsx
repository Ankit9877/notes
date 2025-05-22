import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'
const initialState = {
  notes: localStorage.getItem("notes")
    ? JSON.parse(localStorage.getItem("notes"))
    : []
}

export const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    addToNotes: (state, action) => {
      const note = action.payload;
      const title = state.notes.findIndex((item) => item.title === note.title);
      if(title >= 0){
        toast("same note already exist");
      }
      else{
        state.notes.push(note);
        localStorage.setItem("notes", JSON.stringify(state.notes));
        JSON.stringify(state.notes);
        toast("note created succesfully");
      }
    },
    updateToNotes: (state, action) => {
      const note = action.payload;
      const index = state.notes.findIndex((item) => item._id === note._id);
      if (index >= 0) {
        state.notes[index] = note;
        localStorage.setItem("notes", JSON.stringify(state.notes));
        toast.success("Note updated Succesfully");
      }
    },
    resetAllNotes: (state, action) => {
      state.notes = [];
      localStorage.removeItem("notes");
    },
    removeNote: (state, action) => {
      const noteId = action.payload;
      const index = state.notes.findIndex((item) => item._id === noteId);
      if(index >= 0){
        state.notes.splice(index, 1);
        localStorage.setItem("notes", JSON.stringify(state.notes));
        toast("Note deleted succesfully");
      }
    },
  },
})
export const { addToNotes, updateToNotes, resetAllNotes, removeNote } = noteSlice.actions

export default noteSlice.reducer
