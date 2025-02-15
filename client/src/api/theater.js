import { axiosInstance } from "./index";

export const getAllTheaterForAdmin = async () => {
  try {
    const response = await axiosInstance.get("/theaters/getAll-theater");
    console.log("Response getTheater data: ", response.data);
    return response.data;
  } catch (error) {
    console.log("Error While calling getAllTheater API: ", error.meassage);
  }
};

export const getTheaterId = async (Id) => {
  console.log("Theater Id: ", Id);
  try {
    const response = await axiosInstance.get(`/theaters/get-theater${Id}`);
    console.log("Response getTheaterId: ", response.data);
    return response.data;
  } catch (error) {
    console.log("Error While calling getTheaterId API: ", error.meassage);
    return {
      success: false,
      message: "Failed to get the theater.",
    };
  }
};

export const getAllTheater = async (ownerId) => {
  try {
    if (!ownerId) {
      throw new Error("Owner Id is required");
    }
    console.log("Theater OwnerId: ", ownerId);
    const response = await axiosInstance.post(
      `/theaters/getAll-theater-by-owner/${ownerId}`
    );
    return response.data;
  } catch (error) {
    console.log("Error while calling getAllTheatersForOwner: ", error.meassage);
    return {
      success: false,
      message: "Failed to get all theaters.",
    };
  }
};

export const addTheater = async (payload) => {
  console.log("Theater payload: ", payload);
  try {
    const response = await axiosInstance.post("/theaters/add-theater", payload);
    console.log("Response addTheater: ", response.data);
    return response.data;
  } catch (error) {
    console.log("Error While calling addTheater API: ", error.meassage);
    return {
      success: false,
      message: "Failed to add theater. Please provide the required details.",
    };
  }
};

export const updateTheater = async (payload) => {
  console.log("Theater payload: ", payload);
  try {
    const response = await axiosInstance.put(
      "/theaters/update-theater",
      payload
    );
    console.log("Response updateTheater: ", response.data);
    return response.data;
  } catch (error) {
    console.log("Error While calling updateTheater API: ", error.meassage);
    return {
      success: false,
      message: "Failed to update theater. Please provide the required details.",
    };
  }
};

export const deleteTheater = async (theaterId) => {
  console.log("TheaterId: ", theaterId);
  try {
    const response = await axiosInstance.delete(
      `/theaters/delete-theater/${theaterId}`
    );
    console.log("Response deleteTheater: ", response.data);
    return response.data;
  } catch (error) {
    console.log("Error While calling updateTheater API: ", error.meassage);
    return {
      success: false,
      message: "Failed to delete theater",
    };
  }
};
