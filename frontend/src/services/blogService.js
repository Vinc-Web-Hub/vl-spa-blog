import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
const API_URL_USERS = import.meta.env.VITE_API_URL_USERS;
console.log('API_URL:', API_URL);

/**
 * Fetch all blog posts from the backend.
 * @returns {Promise<Array>} An array of blog post objects.
 */
export const fetchAllPosts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
};

/**
 * Fetch a single blog post by its ID.
 * @param {string} id - The unique identifier of the post to fetch.
 * @returns {Promise<Object|null>} The blog post object or null if not found.
 */
export const fetchPostById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching post with ID ${id}:`, error);
    return null;
  }
};

/**
 * Alias of fetchPostById for clarity when editing posts.
 */
export const getPostById = fetchPostById;

/**
 * Update an existing blog post by its ID.
 * @param {string} id - The ID of the post to update.
 * @param {Object} updatedData - The updated post data.
 * @returns {Promise<Object|null>} The updated post or null if error occurred.
 */
export const updatePost = async (id, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Error updating post with ID ${id}:`, error);
    return null;
  }
};

/**
 * Create a new blog post by sending a POST request to the backend.
 * @param {Object} postData - The data of the new post to be created.
 * @returns {Promise<Object|null>} The created post object or null if an error occurred.
 */
export const createPost = async (postData) => {
  try {
    const response = await axios.post(API_URL, postData);
    return response.data;
  } catch (error) {
    console.error('Error creating post:', error);
    return null;
  }
};

/**
 * Fetch blog posts by domain/category.
 * @param {string} domain - The domain/category to filter posts by.
 * @returns {Promise<Array>} An array of blog post objects belonging to the specified domain.
 */
export const fetchPostsByDomain = async (domain) => {
  try {
    const response = await axios.get(`${API_URL}?domain=${encodeURIComponent(domain)}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching posts by domain:', error);
    return [];
  }
};

// Delete a blog post by its ID

export const deletePost = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting post:', error);
    throw new Error('Failed to delete post');
  }
};

/**
 * Log in a user by sending credentials to the backend.
 * @param {Object} credentials - An object containing username and password.
 * @returns {Promise<Object>} The login response including token and role.
 */
export const loginUser = async ({ username, password }) => {
  try {
    const response = await axios.post(`${API_URL_USERS}/login`, {
      username,
      password
    });
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw new Error(error.response?.data?.error || 'Login failed');
  }
};
