import Input from "@/components/input";
import { Text } from "@/components/text";
import { Box } from "@mui/material";
import React from "react";

const Index = () => {
  const [file, setFile] = React.useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    setFile(selectedFile);
  };

  return (
    <>
      <Box>
        <Text variant="h1">Información presupuestaria</Text>
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
          />
          <br />
          {file && (
            <Text variant="body2">
              Archivo seleccionado: <strong>{file.name}</strong>
            </Text>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Index;
