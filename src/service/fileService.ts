import API_CONFIG from "../config/api";

// 공개 이미지 업로드 (UploadPublicImage)
export const postPublicImage = async (image: File) => {
  const formData = new FormData();
  formData.append("images", image);
  const response = await fetch(`${API_CONFIG.PUBLIC_FILE_API}/images `, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) throw new Error("Failed to post File");

  return response.json();
};

// 공개 이미지 인라인 다운로드(DownloadPublicImageInline)
export const getPublicImage = async (id: number) => {
  const response = await fetch(`${API_CONFIG.PUBLIC_FILE_API}/images/${id}`);

  if (!response.ok) throw new Error("Failed to fetch file.");

  return response.blob();
};

// 공개 이미지 첨부파일 다운로드(DownloadPublicImageAttachment)
export const downloadPublicImage = async (id: number) => {
  const response = await fetch(
    `${API_CONFIG.PUBLIC_FILE_API}/images/${id}?attachment=true`
  );

  if (!response.ok) throw new Error("Failed to fetch file.");

  return response;
};

// 공개 오디오 업로드(UploadPublicAudio)
export const postPublicAudio = async (audio: File) => {
  const formData = new FormData();
  formData.append("audios", audio);
  const response = await fetch(`${API_CONFIG.PUBLIC_FILE_API}/audios `, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) throw new Error("Failed to post File");

  return response.json();
};

// 공개 오디오 인라인 다운로드(DownloadPublicAudioInline)
export const getPublicAudio = async (id: number) => {
  const response = await fetch(`${API_CONFIG.PUBLIC_FILE_API}/audios/${id}`);

  if (!response.ok) throw new Error("Failed to fetch file.");

  return response;
};

// 공개 오디오 첨부파일 다운로드(DownloadPublicAudioAttachment)
export const downloadPublicAudio = async (id: number) => {
  const response = await fetch(
    `${API_CONFIG.PUBLIC_FILE_API}/audios/${id}?attachment=true`
  );

  if (!response.ok) throw new Error("Failed to fetch file.");

  return response;
};
