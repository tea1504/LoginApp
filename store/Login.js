import { createSlice } from "@reduxjs/toolkit"

const loginSlice = createSlice({
  name: "login",
  initialState: {
    form: {
      username: 'admin',
      password: 'admin',
      errUsername: null,
      errPassword: null,
      isSubmitted: false,
    },
    error: null,
    token: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setFormUsername: (state, action) => {
      state.form.username = action.payload;
    },
    setFormPassword: (state, action) => {
      state.form.password = action.payload;
    },
    setFormStatus: (state, action) => {
      state.form.isSubmitted = action.payload;
    },
    setFormError: (state, action) => {
      state.token = action.payload;
      if (action.payload.message) {
        action.payload.message.map(err => {
          if (err.includes('username'))
            state.form.errUsername = err;
          else state.form.errPassword = err;
        })
      }
      else {
        state.error = action.payload;
      }
    },
    resetAllErr: (state) => {
      state.form.errPassword = null;
      state.form.errUsername = null;
      state.error = null;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
  }
})

export const { setToken, setFormError, setFormPassword, setFormUsername, setFormStatus, resetAllErr } = loginSlice.actions;
export const selectLoginToken = state => state.login.token;
export const selectLoginForm = state => state.login.form;
export const selectLoginError = state => state.login.error;
export default loginSlice.reducer;