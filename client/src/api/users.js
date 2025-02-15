import { axiosInstance } from "./index.js";

export const RegisterUser = async (value) => {
  try {
    const response = await axiosInstance.post("/users/register", value);
    console.log("Registered user response: ", response.data);
    return response.data;
  } catch (err) {
    console.log(err.message);
    return {
      success: false,
      message: "Failed to register user. Please provide the required details.",
    };
  }
};

export const LoginUser = async (value) => {
  try {
    const response = await axiosInstance.post("/users/login", value);
    console.log("login user response: ", response.data);
    return response.data;
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "Failed to login.",
    };
  }
};

export const GetCurrentUser = async () => {
  try {
    const response = await axiosInstance.get("/users/get-current-user");
    console.log("get-current-user response: ", response.data);
    return response.data;
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "Failed to get the current user.",
    };
  }
};

export const forgetPassword = async (value) => {
  try {
    console.log("Value of forget password: ", value);
    const response = await axiosInstance.patch("/users/forgotpassword", value);
    console.log("forget password response data: ", response.data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const resetPassword = async (value, email) => {
  try {
    console.log("Value of reset password: ", value, " ", email);
    const response = await axiosInstance.patch(
      `/users/resetpassword/${email}`,
      value
    );
    console.log("reset password response data: ", response.data);
    return response.data;
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "Failed to reset password.",
    };
  }
};
