export const uploadFile = async (file: FormData) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/files/read`,
      {
        method: "POST",
        body: file,
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Error al subir el archivof: ${response.status} ${response.statusText} - ${errorText}`
      );
    }

    return await response.json();
  } catch (error) {
    throw new Error(
      `Ha ocurrido un error al subir el archivo: ${(error as Error).message}`
    );
  }
};