// services/uploadFile.ts
// import { ApiError } from '@/types/auth';

import { ApiError } from "@/types/apiError";

export const uploadFile = async (file: FormData, token: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/files/read`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: file,
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw {
        message: errorData.message || "Error al subir el archivo",
        status: response.status,
      } as ApiError;
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw {
        message: error.message,
        status: 500
      } as ApiError;
    }
    throw error;
  }
};