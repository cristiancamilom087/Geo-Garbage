import React from "react";

export default function Button({
  children,
  type = "button",
  variant = "primario",
  onClick,
  disabled = false,
  fullWidth = false
}) {
  const claseVariante =
    variant === "peligro"
      ? "btn-peligro"
      : variant === "secundario"
      ? "btn-secundario"
      : "btn-primario";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn ${claseVariante} ${fullWidth ? "btn-bloque" : ""}`}
    >
      {children}
    </button>
  );
}