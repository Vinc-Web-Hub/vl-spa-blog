import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
//const API_URL = 'http://localhost:3001/api/posts';
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

// Fetch a single blog post by ID
/**
 * Fetch a single blog post by its ID.
 * @param {string} id - The unique identifier of the post to fetch.
 * @returns {Promise<Object|null>} The blog post object or null if not found.
 */
export const fetchPostById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`)
  return response.data
}

/**
 * Create a new blog post by sending a POST request to the backend.
 * @param {Object} postData - The data of the new post to be created.
 * @param {string} postData.id - The unique identifier for the post.
 * @param {string} postData.title - The title of the post.
 * @param {string} postData.date - The publication date of the post.
 * @param {string} postData.content - The content/body of the post.
 * @param {string} postData.domain - The domain/category of the post (e.g., 'Music').
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
