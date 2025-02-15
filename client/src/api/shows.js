import { axiosInstance } from "./index";

export const addShow = async (payload) => {
  try {
    console.log("payload for add show: ", payload);
    const response = await axiosInstance.post("/shows/add-shows", payload);
    console.log("Response data add show: ", response.data);
    return response.data;
  } catch (err) {
    console.log("Error while calling addShow API: ", err.message);
    return {
      success: false,
      message: "Failed to add show. Please provide the required details.",
    };
  }
};

export const updateShow = async (payload) => {
  try {
    const response = await axiosInstance.put("/shows/update-shows", payload);
    console.log(payload, response);
    return response.data;
  } catch (err) {
    console.log("Error while calling updateShow API: ", err);
    return {
      success: false,
      message: "Failed to update show. Please provide the required details.",
    };
  }
};

export const getShowsByTheater = async ({ theaterId }) => {
  try {
    console.log("Get shows by theater id: ", theaterId);
    const response = await axiosInstance.get(
      `/shows/getAll-shows-by-theater/${theaterId}`
    );
    return response.data;
  } catch (err) {
    console.log("Error while calling getShowsById API: ", err);
  }
};

export const deleteShow = async ({ showId }) => {
  try {
    console.log("Delete show Id: ", showId);
    const response = await axiosInstance.delete(
      `/shows/delete-shows/${showId}`
    );
    return response.data;
  } catch (err) {
    console.log("Error while calling deleteShow API: ", err);
  }
};

export const getAllTheatersByMovie = async ({ movie, date }) => {
  try {
    const response = await axiosInstance.get(
      `/shows/getAll-theaters-by-movie/${movie}/${date}`
    );
    return response.data;
  } catch (err) {
    console.log("Error while calling getAllTheatersByMovie API: ", err);
  }
};

export const getShowById = async ({ showId }) => {
  try {
    console.log("Get show by Id: ", showId);
    const response = await axiosInstance.get(`/shows/get-show-by-id/${showId}`);
    return response.data;
  } catch (err) {
    console.log("Error while calling getMovieById API: ", err);
    return {
      success: false,
      message: "Failed to delete show.",
    };
  }
};
