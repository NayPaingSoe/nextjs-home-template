import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  name: string | null;
  email: string | null;
  id: string | null;
  status: string | null;
  profile_status: string | null;
}

const initialState: AuthState = {
  token: null,
  name: null,
  email: null,
  id: null,
  status: null,
  profile_status: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    clearToken: (state) => {
      state.token = null;
      state.name = null;
      state.email = null;
      state.id = null;
      state.status = null;
      state.profile_status = null;
    },
    setUserData: (
      state,
      action: PayloadAction<{
        id: string;
        name: string;
        email: string;
        status: string;
        profile_status: string | null;
      }>
    ) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.status = action.payload.status;
      state.profile_status = action.payload.profile_status;
    },
    clearUserData: (state) => {
      state.id = null;
      state.name = null;
      state.email = null;
      state.status = null;
      state.profile_status = null;
    },
  },
});

export const { setToken, clearToken, setUserData, clearUserData } =
  authSlice.actions;

export default authSlice.reducer;
