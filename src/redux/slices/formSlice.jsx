import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  details: [],
//   editDetails: null,
  deleteDetails: null,
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setDetails: (state, action) => {
      state.details.push(action.payload);
    // state.details = action.payload;

    },
    // setEditDetails: (state, action) => {
           // const { index, newData } = action.payload;
           // state.details[index] = newData;
        // state.editDetails = action.payload
    // },
    setDeleteDetails: (state, action) => {
    //   state.deleteDetails = action.payload
    state.details.splice(action.payload, 1);
      console.log("deleteDetails",state.deleteDetails)
    },          
    
  },
});

export const {
  setDetails,
//   setEditDetails,
  setDeleteDetails,
} = formSlice.actions;

export default formSlice.reducer;
