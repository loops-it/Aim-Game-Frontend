// config.js
const BASE_API_URL = import.meta.env.VITE_REACT_APP_API_BASE_URL !== undefined
  ? import.meta.env.VITE_REACT_APP_API_BASE_URL
  : null;

export { BASE_API_URL };
