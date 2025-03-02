import { axiosInstance } from ".";

export const makePayment = async (token, amount, seats, showId) => {
  try {
    const response = await axiosInstance.post("/bookings/make-payment", {
      token,
      amount,
      seats,
      showId,
    });
    return response.data;
  } catch (err) {
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
    return {
      success: false,
      message: "Failed to fetch bookings.",
    };
  }
};
