import { object, string } from "yup";

export const loginSchema = object({
    username:string().required('Please enter a username'),
    password:string().min(3,"password have at least 3 characters").required('Please enter a password')
})


