import React from "react";
import { Button } from "@mui/material";

interface ButtonProps {
  label: string | React.ReactNode;
  onClick: () => void;
  color?: "primary" | "secondary" | "error" | "warning" | "info" | "success";
  sx?: object;
  fullWidth?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const ButtonComponent: React.FC<ButtonProps> = ({
  label,
  onClick,
  color = "primary",
  sx,
  fullWidth,
  disabled = false,
  type = "button",
}) => {
  return (
    <Button
      variant="contained"
      color={color}
      onClick={onClick}
      sx={{ marginTop: 2, ...sx }}
      fullWidth={fullWidth}
      disabled={disabled}
      type={type}
    >
      {label}
    </Button>
  );
};

export default ButtonComponent;
