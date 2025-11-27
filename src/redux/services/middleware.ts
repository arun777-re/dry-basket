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
      withCredentials: true,
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
  params={},
}: {
  url: string;
  params?:Record<string,any>;
  reject: (value: any) => any;
}): Promise<T | ReturnType<typeof reject>> => {
  try {
    const response = await axios.get(url,{
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials:true,
      params
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
    const response = await axios.delete(url, {
      withCredentials: true,
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

export const patchRequest = async <T = any>({
  url,
  reject,
  data,
}: {
  url: string;
  data?: any;
  reject: (value: any) => any;
}): Promise<T | ReturnType<typeof reject>> => {
  try {
    const response = await axios.patch(url,data, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials:true,
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


// // function to get shippingCharges
// export const getShippingCharges = async (distance:number)=>{
// if(distance <=5) return 50;
// if(distance > 5 && distance <= 10) return 100;
// if(distance > 10 && distance <= 20) return 150;
// if(distance > 20 && distance <= 30) return 200;
// if(distance > 30 && distance <= 150) return 230;
// return 250;
// }