import axios from "axios";
// middleware to handle post request
export const postRequest = async <T = any>({
  url,
  data,
  reject,
}: {
  url: string;
  data?: any;
  reject: (value: any) => any;
}): Promise<T | ReturnType<typeof reject>> => {
  try {
    const response = await axios.post(url, data, {
      headers: {
        "Content-Type":
          data instanceof FormData ? "multipart/form-data" : "application/json",
      },
    });

    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Something went wrong during Post request";
    return reject(message);
  }
};

export const getRequest = async <T = any>({
  url,
  reject,
}: {
  url: string;
  reject: (value: any) => any;
}): Promise<T | ReturnType<typeof reject>> => {
  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Something went wrong during Post request";
    return reject(message);
  }
};
export const deleteRequest = async <T = any>({
  url,
  reject,
}: {
  url: string;
  reject: (value: any) => any;
}): Promise<T | ReturnType<typeof reject>> => {
  try {
    const response = await axios.delete(url);

    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Something went wrong during Post request";
    return reject(message);
  }
};
export const putRequest = async <T = any>({
  url,
  reject,
  data,
}: {
  url: string;
  data?: any;
  reject: (value: any) => any;
}): Promise<T | ReturnType<typeof reject>> => {
  try {
    const response = await axios.put(url, {
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    });

    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Something went wrong during Post request";
    return reject(message);
  }
};
