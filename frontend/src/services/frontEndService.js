import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;
const API_URL_POSTS = `${BASE_URL}/api/posts`;
const API_URL_USERS = `${BASE_URL}/api/users`;
const API_URL_PERSONS = `${BASE_URL}/api/person`;
const API_URL_VS = `${BASE_URL}/api/vital-signs`;


console.log('BASE_URL:', BASE_URL);
console.log('API_URL_POSTS:', API_URL_POSTS);
/**
 * Fetch all blog posts from the backend.
 * @returns {Promise<Array>} An array of blog post objects.
 */
export const fetchAllPosts = async () => {
  try {
    const response = await axios.get(API_URL_POSTS);
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
    const response = await axios.get(`${API_URL_POSTS}/${id}`);
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
 * Fetch blog posts by domain/category.
 * @param {string} domain - The domain/category to filter posts by.
 * @returns {Promise<Array>} An array of blog post objects belonging to the specified domain.
 */
export const fetchPostsByDomain = async (domain) => {
  try {
    const response = await axios.get(`${API_URL_POSTS}?domain=${encodeURIComponent(domain)}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching posts by domain:', error);
    return [];
  }
};

/**
 * Create a new blog post by sending a POST request to the backend.
 * @param {Object} postData - The data of the new post to be created.
 * @returns {Promise<Object|null>} The created post object or null if an error occurred.
 */
export const createPost = async (postData) => {
  try {
    const response = await axios.post(API_URL_POSTS, postData);
    return response.data;
  } catch (error) {
    console.error('Error creating post:', error);
    return null;
  }
};

/**
 * Update an existing blog post by its ID.
 * @param {string} id - The ID of the post to update.
 * @param {Object} updatedData - The updated post data.
 * @returns {Promise<Object|null>} The updated post or null if error occurred.
 */
export const updatePost = async (id, updatedData) => {
  try {
    const response = await axios.put(`${API_URL_POSTS}/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Error updating post with ID ${id}:`, error);
    return null;
  }
};

// Delete a blog post by its ID

export const deletePost = async (id) => {
  try {
    const response = await axios.delete(`${API_URL_POSTS}/${id}`);
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

/**
 * Create a new person by sending a POST request to the backend.
 * @param {Object} postData - The data of the new post to be created.
 * @returns {Promise<Object|null>} The created post object or null if an error occurred.
 */
export const createPerson = async (postData) => {
  try {
    console.log('frontEndService - Creating person with data:', postData); // Debugging line
    const response = await axios.post(API_URL_PERSONS, postData);
    return response.data;
  } catch (error) {
    console.error('Error creating person:', error);
    return null;
  }
};

// Create a new VitalSigns record by sending a POST request to the backend.
export const createVitalSigns = async (data) => {
  try {
    const response = await axios.post(API_URL_VS, data);
    return response.data;
  } catch (error) {
    console.error('Error saving vital signs:', error);
    throw error;
  }
};

// Fetch all person from the backend
export const fetchAllPerson = async () => {
  try {
    const response = await axios.get(API_URL_PERSONS);
    return response.data;
  } catch (error) {
    console.error('Error fetching person:', error);
    return [];
  }
};

// Fetch a single patient by ID
export const fetchPersonById = async (id) => {
  try {
    const response = await axios.get(`${API_URL_PERSONS}/${id}`)
    return response.data
  } catch (err) {
    console.error('Failed to fetch person:', err)
    return null
  }
}

// Update a person by ID
export const updatePerson = async (id, updatedData) => {
  try {
    const response = await axios.put(`${API_URL_PERSONS}/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error('Error updating person:', error);
    throw error;
  }
};

