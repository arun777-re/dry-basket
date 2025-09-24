import * as yup from 'yup';


export const initialSignUpSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().required("Please enter a valid email"),
  password: yup.string().required(),
});