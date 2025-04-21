import authAPI from "../authApi";

export const getAllUrlApi = async (): Promise<string[]> => {
    const response = await authAPI.get("/file/get-list-url");
    return response.data.data; // hoặc response.data tùy backend trả
  };

  

// src/api/admin/imageApi.ts

export const uploadImageApi = async (formData: FormData): Promise<void> => {
  const response = await authAPI.post("/file/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  if (response.data.size === 0) {
    throw new Error("Failed to upload images");
  }
};

