import ButtonComponent from "@/components/button";
import Input from "@/components/input";
import { Text } from "@/components/text";
import { useSnack } from "@/hooks/useSnack";
import { loginService } from "@/services/generatePdfInvoice";
import { Box, CircularProgress } from "@mui/material";
import Router from "next/router";
import React, { useState } from "react";

const LoginMain = () => {
  const { enqueueSnack } = useSnack();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const newErrors = {
      username: "",
      password: "",
    };

    let isValid = true;

    if (!credentials.username.trim()) {
      newErrors.username = "El usuario es requerido";
      isValid = false;
    }

    if (!credentials.password.trim()) {
      newErrors.password = "La contraseña es requerida";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = async () => {
    if (!validate()) return;

    setIsLoading(true);
    try {
      const response = await loginService(credentials);
      const data = await response.json();

      if (!response.ok) {
        enqueueSnack("Error de autenticación", "error");
        throw new Error(data?.message || "Error de autenticación");
      }

      Router.push("/uploadFile");
    } catch (error) {
      enqueueSnack("Error al iniciar sesión", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange =
    (field: keyof typeof credentials) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setCredentials((prev) => ({ ...prev, [field]: event.target.value }));
      setErrors((prev) => ({ ...prev, [field]: "" })); // limpiar error al escribir
    };

  const { username, password } = credentials;

  return (
    <Box
      sx={{
        width: "30%",
        height: "55vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: "0 auto",
        padding: "1rem",
        gap: "1rem",
        bgcolor: "background.paper",
      }}
    >
      <Text variant="h1">Iniciar sesión</Text>

      <Input
        type="text"
        placeholder="Usuario"
        label="Usuario"
        value={username}
        errorText={errors.username}
        sx={{ width: "100%" }}
        onChange={handleChange("username")}
      />

      <Input
        type="password"
        placeholder="Contraseña"
        label="Contraseña"
        value={password}
        errorText={errors.password}
        sx={{ width: "100%" }}
        onChange={handleChange("password")}
      />

      <ButtonComponent
        color="primary"
        fullWidth
        onClick={handleLogin}
        disabled={isLoading}
        label={
          isLoading ? (
            <CircularProgress size={20} sx={{ color: "#fff" }} />
          ) : (
            "Iniciar sesión"
          )
        }
      />
    </Box>
  );
};

export default LoginMain;
