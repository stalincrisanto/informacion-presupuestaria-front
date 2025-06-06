import React from "react";
import { Button } from "@mui/material";

interface ButtonProps {
  label: string | React.ReactNode;
  onClick: () => void;
  color?: "primary" | "secondary" | "error" | "warning" | "info" | "success";
  sx?: object;
  fullWidth?: boolean;
  disabled?: boolean;
}

const ButtonComponent: React.FC<ButtonProps> = ({
  label,
  onClick,
  color = "primary",
  sx,
  fullWidth,
  disabled = false,
}) => {
  return (
    <Button
      variant="contained"
      color={color}
      onClick={onClick}
      sx={{ marginTop: 2, ...sx }}
      fullWidth={fullWidth}
      disabled={disabled}
    >
      {label}
    </Button>
  );
};

export default ButtonComponent;
