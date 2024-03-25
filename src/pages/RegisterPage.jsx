import { TextField } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { emailOnchange, usernameOnchange } from "../store/slice/authSlice";

export default function RegisterPage() {
  const dispatch = useDispatch();
  const {
    user: { username, password, confirmPassword, email },
  } = useSelector((state) => {
    return state.auth;
  });
  const usernameOnchanage = (e) => {
    dispatch(usernameOnchange(e.target.value));
  };

  const emailchange =(e)=>{
    dispatch(emailOnchange(e.target.value))
  }

const passwordOnchange = (e)=>{
    dispatch(passwo(e.target.value))
}

const confirmPasswordOnchange = (e)=>{
    dispatch(emailOnchange(e.target.value))
}


  return (
    <div className="flex justify-center  ">
      <form>
        <div>
          <TextField
            variant="filled"
            value={username}
            onChange={(e) => usernameOnchanage(e)}
            placeholder="Username"
          />
        </div>
        <div>
          <TextField variant="filled" placeholder="Email" />
        </div>
        <div>
          <TextField variant="filled" placeholder="Password" />
        </div>
        <div>
          <TextField variant="filled" placeholder="ConfirmPassword" />
        </div>
      </form>
    </div>
  );
}
