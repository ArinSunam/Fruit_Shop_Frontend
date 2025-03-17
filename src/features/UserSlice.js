import { createSlice } from "@reduxjs/toolkit";
import { clearAllData, getUser, setUser } from "./Storage";

const initialState = {
  user: getUser()
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserToLocal: (state, action) => {
      state.user = action.payload
      setUser(action.payload)
    },
    clearAll: (state) => {
      (state.user = null), clearAllData()
    }
  }
})

export const { setUserToLocal, clearAll } = userSlice.actions
export default userSlice.reducer