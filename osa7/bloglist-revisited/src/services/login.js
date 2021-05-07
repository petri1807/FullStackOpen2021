import axios from 'axios';
const baseUrl = '/api/login';

/**
 * @param credentials - User credential used for logging in
 */
const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

export default { login };
