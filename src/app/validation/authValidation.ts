import * as yup from 'yup';


export const initialSignUpSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&]).{6,10}$/,
      "Password must be 6-10 characters and include uppercase, lowercase, number, and special character"
    )
    .required("Password is required"),
});

export const initialLoginSchema = yup.object().shape({
  email: yup
    .string().email("Please enter a valid email")
    .required("Email is required"),
password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&]).{6,10}$/,
      "Password must be 6-10 characters and include uppercase, lowercase, number, and special character"
    )
    .required("Password is required"),
});



export const initialUpdatePasswordSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&]).{6,10}$/,
      "Password must be 6-10 characters and include uppercase, lowercase, number, and special character"
    )
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});
