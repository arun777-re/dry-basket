import * as yup from 'yup';


export const shippingSchema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  address: yup.string().required("Address is required"),
  appartment: yup.string(), 
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  pinCode: yup.string()
    .required("Pin Code is required")
    .matches(/^\d{6}$/, "Pin Code must be 6 digits"),
  phone: yup.string().required("Contact is required").max(10,"Mobile no must be 10 digits").min(10,"Mobile no must be 10 digits"),
  agreeForBlogs: yup.boolean(),
  agreeTosave: yup.boolean(),
});