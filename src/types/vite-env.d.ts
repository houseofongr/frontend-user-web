/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BACK_ADMIN_API: string;
  readonly VITE_BACK_USER_API: string;
  readonly VITE_IMAGE_LOAD_PRIVATE: string;
  readonly VITE_IMAGE_LOAD_PUBLIC: string;
  readonly VITE_AUDIO_LOAD_PRIVATE: string;
  readonly VITE_AUDIO_LOAD_PUBLIC: string;
  readonly VITE_EMAILJS_SERVICE_ID: string;
  readonly VITE_EMAILJS_TEMPLATE_ID: string;
  readonly VITE_EMAILJS_PUBLIC_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
