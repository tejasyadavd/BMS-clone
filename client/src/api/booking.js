import { axiosInstance } from ".";

export const makePayment = async (token, amount) => {
  console.log("token: ", token, " amount: ", amount);
  try {
    const response = await axiosInstance.post("/bookings/make-payment", {
      token,
      amount,
    });
    return response.data;
  } catch (err) {
    console.log("Error while calling make payment API: ", err);
    return {
      success: false,
      message: "Payment request failed",
    };
  }
};

export const bookShow = async (payload) => {
  try {
    const response = await axiosInstance.post("/bookings/book-show", payload);
    return response.data;
  } catch (err) {
    console.log("Error while calling book show: ", err);
    return {
      success: false,
      message: "Failed to book show.",
    };
  }
};

export const getAllBookings = async (payload) => {
  try {
    const response = await axiosInstance.get(
      `/bookings/getAll-bookings/${payload.userId}`
    );
    return response.data;
  } catch (err) {
    console.log("Error while getting all bookings: ", err);
    return {
      success: false,
      message: "Failed to get all bookings.",
    };
  }
};
