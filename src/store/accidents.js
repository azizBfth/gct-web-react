import { createSlice } from '@reduxjs/toolkit';

const { reducer, actions } = createSlice({
  name: 'accidents',
  initialState: {
    items: [],
    selectedItem: null
  },
  reducers: {

    setItems(state, action) {
      state.items = action.payload;
    },
   
    update(state, action) {
      action.payload.forEach((item) => state.items[item.id] = item);
    },
    select(state, action) {
      state.selectedItem = state.items.filter(element => element._id === action.payload)    
    },
    remove(state, action) {
   state.items = state.items.filter(element => element._id !== action.payload)    
    },
  },
});

export { actions as accidentsActions };
export { reducer as accidentsReducer };
