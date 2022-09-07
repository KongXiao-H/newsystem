import { configureStore } from '@reduxjs/toolkit'
import  searchSlice  from './search-slice'
import userSlice from './user-slice'

export default configureStore({
  reducer: {
    user:userSlice,
    search_result:searchSlice,
  },
})