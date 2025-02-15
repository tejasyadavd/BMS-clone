import { axiosInstance } from "./index";

export const getAllMovies = async () => {
  try {
    const response = await axiosInstance.get("/movies/getAll-Movies");
    console.log("getAll movie response data: ", response.data);
    return response.data;
  } catch (error) {
    console.log("Error while calling getAllMovies API", error);
    return {
      success: false,
      message: "Failed to get all movies.",
    };
  }
};

export const getMovieById = async (id) => {
  try {
    const response = await axiosInstance.get(`/movies/get-Movie/${id}`);
    console.log("get movieId response data: ", response.data);
    return response.data;
  } catch (error) {
    console.log("Error while calling getMovieById API", error);
    return {
      success: false,
      message: "Failed to get movie.",
    };
  }
};

export const addMovie = async (movie) => {
  try {
    console.log("Movie", movie);
    const response = await axiosInstance.post("/movies/add-Movies", movie);
    console.log("add movie response data: ", response.data);
    return response.data;
  } catch (error) {
    console.log("Error while calling addMovie API", error);
    return {
      success: false,
      message: "Failed to add show. Please provide the required details.",
    };
  }
};

export const updateMovie = async (movie) => {
  try {
    const response = await axiosInstance.put("/movies/update-Movies", movie);
    console.log("update movie response data: ", response.data);
    return response.data;
  } catch (error) {
    console.log("Error while calling updateMovie", error);
    return {
      success: false,
      message: "Failed to update movie. Please provide the required details.",
    };
  }
};

export const deleteMovie = async (movieId) => {
  try {
    const response = await axiosInstance.post("/movies/delete-Movies", {
      movieId,
    });
    console.log("delete movie response data: ", response.data);
    return response.data;
  } catch (error) {
    console.log("Error while calling deleteMovie API", error);
    return {
      success: false,
      message: "Failed to delete movie.",
    };
  }
};
