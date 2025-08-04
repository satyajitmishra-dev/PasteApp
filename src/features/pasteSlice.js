import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  pastes: localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes"))
    : [],
};

export const pasteSlice = createSlice({
  name: "paste",
  initialState,
  reducers: {
    addToPaste: (state, action) => {
      const paste = action.payload;
      state.pastes.push(paste);
      if (typeof localStorage !== "undefined") {
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
      }
      toast.success("Your Paste Successfully Created 👏");
    },
    updateToPaste: (state, action) => {
      const paste = action.payload;
     
      const indexOfPaste = state.pastes.findIndex(
        (item) => item._id === paste._id
      );

      if (indexOfPaste >= 0) {
        state.pastes[indexOfPaste] = paste;
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Successfully Updated Your Paste !!");
      }
    },
    resetAllPaste: (state, action) => {
      state.pastes = [];
      localStorage.removeItem("pastes");
    },
  removeFromPaste: (state, action) => {

  const pasteIDToRemove = action.payload;

  const indexToRemove = state.pastes.findIndex(
    (item) => item._id === pasteIDToRemove
  );


  if (indexToRemove !== -1) {
 
    state.pastes.splice(indexToRemove, 1);

    localStorage.setItem("pastes", JSON.stringify(state.pastes));
  } else toast.error("Something Wrong !")
},
  },
});


export const { addToPaste, updateToPaste, resetAllPaste, removeFromPaste } = pasteSlice.actions;

export default pasteSlice.reducer;
