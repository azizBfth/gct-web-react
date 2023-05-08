import { createSlice } from "@reduxjs/toolkit";

const { reducer, actions } = createSlice({
  name: "session",
  initialState: {
    user: {},
  },
  reducers: {
    updateUser(state, action) {
      state.user = action.payload;
    },
  },
});

export { actions as sessionActions };
export { reducer as sessionReducer };
