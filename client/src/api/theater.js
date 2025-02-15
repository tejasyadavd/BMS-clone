import { axiosInstance } from "./index";

export const getAllTheaterForAdmin = async () => {
  try {
    const response = await axiosInstance.get("/theaters/getAll-theater");
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: "Failed to fetch theaters. Please try again.",
    };
  }
};

export const getTheaterId = async (Id) => {
  try {
    const response = await axiosInstance.get(`/theaters/get-theater${Id}`);
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: "Failed to fetch theater details. Please try again.",
    };
  }
};

export const getAllTheater = async (ownerId) => {
  try {
    if (!ownerId) {
      throw new Error("Owner Id is required");
    }
    const response = await axiosInstance.post(
      `/theaters/getAll-theater-by-owner/${ownerId}`
    );
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: "Failed to fetch theaters.",
    };
  }
};

export const addTheater = async (payload) => {
  try {
    const response = await axiosInstance.post("/theaters/add-theater", payload);
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: "Failed to add theater. Please provide the required details.",
    };
  }
};

export const updateTheater = async (payload) => {
  try {
    const response = await axiosInstance.put(
      "/theaters/update-theater",
      payload
    );
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: "Failed to update theater. Please provide the required details.",
    };
  }
};

export const deleteTheater = async (theaterId) => {
  try {
    const response = await axiosInstance.delete(
      `/theaters/delete-theater/${theaterId}`
    );
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: "Failed to delete theater",
    };
  }
};
