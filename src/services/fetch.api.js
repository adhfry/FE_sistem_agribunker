import axios from "../plugins/axios";

/**
 * Helper function to handle API responses consistently.
 * @param {Promise} request - The axios request promise.
 * @returns {Promise<Object | string | number | any[] | any>} The response object containing status, data, and message.
 */
const handleResponse = async (request) => {
  try {
    const response = await request;
    const { status, data, message } = response;

    return { status, data, message };
  } catch (error) {
    return {
      status: "error",
      data: null,
      message: error.response?.data?.message || "An error occurred.",
    };
  }
};

/**
 * Send a POST request to the API.
 * @param {string} route - The API route.
 * @param {Object | null} payload - The data to send.
 * @returns {Promise<Object | string | number | any[] | any>} The API response.
 */
export const loginApi = async (route, payload) => {
  await axios.get("/sanctum/csrf-cookie");
  return handleResponse(axios.post("/api" + route, payload));
};

/**
 * Send a POST request to the API.
 * @param {string} route - The API route.
 * @param {Object | null} payload - The data to send.
 * @returns {Promise<Object | string | number | any[] | any>} The API response.
 */
export const postApi = (route, payload) => {
  return handleResponse(axios.post("/api" + route, payload));
};

/**
 * Send a GET request to the API.
 * @param {string} route - The API route.
 * @returns {Promise<Object | string | number | any[] | any>} The API response.
 */
export const getApi = async (route) => {
  return handleResponse(await axios.get("/api" + route));
};

/**
 * Send a PUT request to the API.
 * @param {string} route - The API route.
 * @param {Object} payload - The data to send.
 * @returns {Promise<Object | string | number | any[] | any>} The API response.
 */
export const putApi = (route, payload) => {
  return handleResponse(axios.put("/api" + route, payload));
};

/**
 * Send a PATCH request to the API.
 * @param {string} route - The API route.
 * @param {Object} payload - The data to send.
 * @returns {Promise<Object | string | number | any[] | any>} The API response.
 */
export const patchApi = (route, payload) => {
  return handleResponse(axios.patch("/api" + route, payload));
};

/**
 * Send a DELETE request to the API.
 * @param {string} route - The API route.
 * @returns {Promise<Object | string | number | any[] | any>} The API response.
 */
export const deleteApi = (route) => {
  return handleResponse(axios.delete("/api" + route));
};

/**
 * Get an image file from the API
 * @param {string} route - The API route for the image.
 * @returns {Promise<Blob>} The image file as a Blob.
 */
export const getImageApi = (route) => {
  return axios
    .get(route, {
      responseType: "blob", // Mendapatkan response sebagai Blob
    })
    .then((response) => {
      return URL.createObjectURL(response.data); // Mengonversi Blob ke URL
    })
    .catch((error) => {
      console.error("Error fetching image:", error);
      throw error;
    });
};
