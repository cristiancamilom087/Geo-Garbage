import React from "react";

export default function InputField({
  label,
  name,
  value,
  onChange,
  error = "",
  type = "text",
  placeholder = "",
  as = "input",
  options = []
}) {
  const claseControl = `campo-control ${error ? "campo-error-control" : ""}`;

  return (
    <div className="campo-grupo">
      <label htmlFor={name} className="campo-label">
        {label}
      </label>

      {as === "select" ? (
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={claseControl}
        >
          {options.map((op) => (
            <option key={op.value} value={op.value}>
              {op.label}
            </option>
          ))}
        </select>
      ) : as === "textarea" ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={claseControl}
          style={{ minHeight: "74px", resize: "vertical" }}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={claseControl}
        />
      )}

      {error && (
        <span role="alert" className="campo-error-texto">
          ⚠️ {error}
        </span>
      )}
    </div>
  );
}