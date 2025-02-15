import { axiosInstance } from "./index.js";

export const RegisterUser = async (value) => {
  try {
    const response = await axiosInstance.post("/users/register", value);
    return response.data;
  } catch (err) {
    return {
      success: false,
      message: "Failed to register user. Please provide the required details.",
    };
  }
};

export const LoginUser = async (value) => {
  try {
    const response = await axiosInstance.post("/users/login", value);
    return response.data;
  } catch (err) {
    return {
      success: false,
      message: "Failed to login.",
    };
  }
};

export const GetCurrentUser = async () => {
  try {
    const response = await axiosInstance.get("/users/get-current-user");
    return response.data;
  } catch (err) {
    return {
      success: false,
      message: "Failed to fetch user details.",
    };
  }
};

export const forgetPassword = async (value) => {
  try {
    const response = await axiosInstance.patch("/users/forgotpassword", value);
    return response.data;
  } catch (err) {
    return {
      success: false,
      message: "Failed to process forgot password request.",
    };
  }
};

export const resetPassword = async (value, email) => {
  try {
    const response = await axiosInstance.patch(
      `/users/resetpassword/${email}`,
      value
    );
    return response.data;
  } catch (err) {
    return {
      success: false,
      message: "Failed to reset password.",
    };
  }
};
