import * as yup from "yup";

export const filterSchema = yup
  .object()
  .shape({
    productName: yup.string().nullable(),
    category: yup.array().of(yup.string()).nullable(),
    weight: yup.string().nullable(),
    price: yup
      .number()
      .nullable(),
  })
  .test(
    "at-least-one",
    "At least one filter must be provided",
    (values) => {
      return (
        !!values?.productName ||
        !!values?.category ||
        !!values?.weight ||
        (Array.isArray(values?.price) &&
          (values.price[0] !== 0 || values.price[1] !== 20000))
      );
    }
  );
