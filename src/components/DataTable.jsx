import React from "react";
import Button from "./Button";

export default function DataTable({
  columns = [],
  data = [],
  onDelete,
  emptyMessage = "No hay registros disponibles en este momento."
}) {
  if (!data || data.length === 0) {
    return <p className="tabla-vacia">{emptyMessage}</p>;
  }

  return (
    <div className="tabla-envoltura">
      <table className="tabla-datos">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
            {onDelete && <th style={{ textAlign: "center" }}>Acciones</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              {columns.map((col) => {
                const rawValue = row[col.key];
                const cellValue =
                  typeof col.format === "function"
                    ? col.format(rawValue, row)
                    : rawValue;

                return <td key={col.key}>{cellValue}</td>;
              })}
              {onDelete && (
                <td style={{ textAlign: "center" }}>
                  <Button variant="peligro" onClick={() => onDelete(row.id)}>
                    Eliminar
                  </Button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}