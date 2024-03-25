import { Button, TextField, colors } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  emailOnchange,
  errorDisplayLogin,
  loginAction,
  passwordOnchange,
  usernameOnchange,
} from "../store/slice/authSlice";
import { loginSchema } from "../utils/loginValidation";
import { ValidationError } from "yup";
import { setAccessToken } from "../utils/local-storage";

export default function LoginPage() {
  const dispatch = useDispatch();
  const {
    user: { username, password, accessToken },
    error,
    loading,
  } = useSelector((state) => state.auth);

  const handleUsernameChange = (e) => {
    dispatch(usernameOnchange(e.target.value));
  };

  const handlePasswordOnchange = (e) => {
    dispatch(passwordOnchange(e.target.value));
  };

  const handleSubmit = async (e) => {
    try {
      const data = {
        username,
        password,
      };
      const user = await loginSchema.validate(data, { abortEarly: false });
      dispatch(loginAction(user));
      setAccessToken(accessToken);
      dispatch(errorDisplayLogin());
    } catch (error) {
      if (error) {
        const resultError = error.inner?.reduce((acc, item) => {
          acc[item.path] = item.message;

          return acc;
        }, {});
        dispatch(errorDisplayLogin(resultError));
      }
    }
  };
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div className="flex flex-col items-center">
        <div>
          <TextField
            variant="filled"
            value={username}
            error={error.username.isError}
            helperText={error.username.value}
            onChange={(e) => {
              handleUsernameChange(e);
            }}
            placeholder="Username"
          />
        </div>
        <div>
          <TextField
            variant="filled"
            value={password}
            error={error.password.isError}
            helperText={error.password.value}
            onChange={(e) => {
              handlePasswordOnchange(e);
            }}
            placeholder="password"
            type="password"
          />
        </div>
        <div className="mt-5">
          <Button
            onClick={(e) => {
              handleSubmit(e, username, password);
            }}
            sx={{
              fontWeight: "600",
              color: "white",
              background: "#FF6624",
              ":hover": {
                background: "#e55b20",
              },
            }}
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}
