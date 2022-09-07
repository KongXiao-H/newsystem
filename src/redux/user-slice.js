import { createSlice } from '@reduxjs/toolkit'


let session_user = sessionStorage.getItem('user')?sessionStorage.getItem('user'):'';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    value: session_user,
  },
  reducers: {
    storeState: (state,actions) => {
      sessionStorage.setItem('user', actions.payload);
      state.value = actions.payload;
    },
    logoutState:(state,actions)=>{
      sessionStorage.removeItem("user");
      state.value = '';
    }
  },
})

export const { storeState,logoutState } = userSlice.actions

export default userSlice.reducer