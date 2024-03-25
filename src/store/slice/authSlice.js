import { createAsyncThunk, createSlice, isPending } from "@reduxjs/toolkit";
import { loginUser } from "../../utils/userApi";

export const loginAction = createAsyncThunk("auth/login", async (input) => {
  try {
    const data = await loginUser(input);
    return data
  } catch (error) {
    throw error.response
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {
      username: "",
      password: "",
      confirmPassword: "",
      email: "",
      accessToken:""
    },
    data: [],
    error: {
      username: {
        value: "",
        isError: false,
      },
      password: { value: "", isError: false },
    },
    loading: false,
  },
  reducers: {
    usernameOnchange(state, action) {
      // console.log(action.payload);
      state.user.username = action.payload;
    },
    emailOnchange(state, action) {
      console.log(action.payload);
      state.user.email = action.payload;
    },
    passwordOnchange(state, action) {
      state.user.password = action.payload;
    },
    confirmPassword(state, action) {
      state.user.confirmPassword = action.payload;
    },
    errorDisplayLogin(state, action) {
      if (
        action.payload?.username !== undefined &&
        action.payload?.password !== undefined
      ) {
        state.error.username.value = action.payload.username;
        state.error.username.isError = true
        state.error.password.value = action.payload.password;
        state.error.password.isError = true
      } else if (action.payload?.email !== undefined) {
        state.error.username.value = action.payload.username;
        state.error.username.isError = true
        state.error.password.value = "";
        state.error.password.isError = false

      } else if (action.payload?.password !== undefined) {
        state.error.username.value = "";
        state.error.username.isError = false
        state.error.password.value = action.payload.password;
        state.error.password.isErorr = true
      } else {
        state.error.username.value = "";
        state.error.username.isError = false
        state.error.password.value = "";
        state.error.username.isError = false
      }
    }
    ,
    
  },
  extraReducers:(builder)=>{
    builder.addCase(loginAction.pending,(state,action)=>{

      state.loading = true
    })
    builder.addCase(loginAction.fulfilled,(state,action)=>{
      console.log(state.user)
      console.log(action)
      state.user.username = action.payload.user.username 
      state.user.accessToken = action.payload.accessToken
      state.user.email = action.payload.user.email
      state.loading = false
    })
    builder.addCase(loginAction.rejected,(state,action)=>{
      console.log(action.error)
      state.loading = false
    })
  }
});

export const {
  usernameOnchange,
  emailOnchange,
  passwordOnchange,
  confirmPassword,
  errorDisplayLogin,

} = authSlice.actions;
export const authReducer = authSlice.reducer;
