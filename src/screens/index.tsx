import Input from "@/components/input";
import { Text } from "@/components/text";
import { useSnack } from "@/hooks/useSnack";
import { Box, CircularProgress } from "@mui/material";
import React, { useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import ButtonComponent from "@/components/button";

const Index = () => {
  const { enqueueSnack } = useSnack();
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    if (selectedFile) {
      const validExtensions = [".xlsx", ".xls"];
      const fileExtension = selectedFile.name.split(".").pop()?.toLowerCase();
      if (!validExtensions.includes(`.${fileExtension}`)) {
        enqueueSnack("Formato de archivo no válido. Debe ser XLSX.", "error");
        setFile(null);
        return;
      }
    }
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const isSuccess = false;
      isSuccess
        ? enqueueSnack("Archivo subido correctamente", "success")
        : enqueueSnack("Error al subir el archivo", "error");

      setFile(null);
    }, 10000);
    setFile(null);
  };

  return (
    <>
      <Box>
        <Box display={"flex"} justifyContent={"space-between"}>
          <Text variant="h1">Información presupuestaria</Text>
          <LogoutIcon
            onClick={() => {
              alert("Cerrar sesión no implementado");
            }}
            sx={{
              background: "#79ACD9",
              borderRadius: "50%",
              width: "35px",
              height: "35px",
              padding: "5px",
              "&:hover": {
                backgroundColor: "#4178B8",
              },
            }}
          />
        </Box>
        <br />
        <Box
          sx={{
            width: "40%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            margin: "0 auto",
          }}
        >
          <Input
            type="file"
            value={file}
            onChange={handleFileChange}
            label="Sube tu archivo correspondiente"
            disabled={isLoading}
          />
          <br />
          {file && (
            <>
              <Text variant="body2">
                Archivo seleccionado: <strong>{file.name}</strong>
              </Text>
              {!isLoading && (
                <ButtonComponent 
                  label="Subir archivo"
                  color="primary"
                  onClick={handleUpload}
                  disabled={isLoading}
                />
              )}
            </>
          )}
          {isLoading && (
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
              <CircularProgress size={24} sx={{ mr: 2 }} />
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Index;
