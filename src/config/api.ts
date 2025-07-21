const API_CONFIG = {
  BACK_ADMIN_API: import.meta.env.VITE_BACK_ADMIN_API || "",
  BACK_USER_API: import.meta.env.VITE_BACK_USER_API || "",
  PRIVATE_IMAGE_LOAD_API: import.meta.env.VITE_IMAGE_LOAD_PRIVATE || "",
  PUBLIC_IMAGE_LOAD_API: import.meta.env.VITE_IMAGE_LOAD_PUBLIC || "",
  PRIVATE_AUDIO_LOAD_API: import.meta.env.VITE_AUDIO_LOAD_PRIVATE || "",
  PUBLIC_AUDIO_LOAD_API: import.meta.env.VITE_AUDIO_LOAD_PUBLIC || "",
};

export default API_CONFIG;
