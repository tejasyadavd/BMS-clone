import { axiosInstance } from "./index";

export const getAllMovies = async () => {
  try {
    const response = await axiosInstance.get("/movies/getAll-Movies");
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: "Failed to fetch movies. Please try again.",
    };
  }
};

export const getMovieById = async (id) => {
  try {
    const response = await axiosInstance.get(`/movies/get-Movie/${id}`);
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: "Failed to fetch movie. Please try again.",
    };
  }
};

export const addMovie = async (movie) => {
  try {
    const response = await axiosInstance.post("/movies/add-Movies", movie);
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: "Failed to add movie. Please provide the required details.",
    };
  }
};

export const updateMovie = async (movie) => {
  try {
    const response = await axiosInstance.put("/movies/update-Movies", movie);
    return response.data;
  } catch (error) {
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
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: "Failed to delete movie.",
    };
  }
};
