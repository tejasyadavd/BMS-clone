import { axiosInstance } from "./index";

export const addShow = async (payload) => {
  try {
    const response = await axiosInstance.post("/shows/add-shows", payload);
    return response.data;
  } catch (err) {
    return {
      success: false,
      message: "Failed to add show. Please provide the required details.",
    };
  }
};

export const updateShow = async (payload) => {
  try {
    const response = await axiosInstance.put("/shows/update-shows", payload);
    return response.data;
  } catch (err) {
    return {
      success: false,
      message: "Failed to update show. Please provide the required details.",
    };
  }
};

export const getShowsByTheater = async ({ theaterId }) => {
  try {
    const response = await axiosInstance.get(
      `/shows/getAll-shows-by-theater/${theaterId}`
    );
    return response.data;
  } catch (err) {
    return {
      success: false,
      message: "Failed to fetch shows. Please try again.",
    };
  }
};

export const deleteShow = async ({ showId }) => {
  try {
    const response = await axiosInstance.delete(
      `/shows/delete-shows/${showId}`
    );
    return response.data;
  } catch (err) {
    return {
      success: false,
      message: "Failed to delete show.",
    };
  }
};

export const getAllTheatersByMovie = async ({ movie, date }) => {
  try {
    const response = await axiosInstance.get(
      `/shows/getAll-theaters-by-movie/${movie}/${date}`
    );
    return response.data;
  } catch (err) {
    return {
      success: false,
      message: "Failed to fetch theaters. Please try again.",
    };
  }
};

export const getShowById = async ({ showId }) => {
  try {
    const response = await axiosInstance.get(`/shows/get-show-by-id/${showId}`);
    return response.data;
  } catch (err) {
    return {
      success: false,
      message: "Failed to fetch show details. Please try again.",
    };
  }
};
