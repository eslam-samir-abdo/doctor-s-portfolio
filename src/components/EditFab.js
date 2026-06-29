import React from "react";
import { useAdmin } from "../context/AdminContext";
import "./EditFab.css";

export default function EditFab({ onClick, label = "Edit" }) {
  const { isAdmin } = useAdmin();
  if (!isAdmin) return null;

  return (
    <button className="edit-fab" onClick={onClick}>
      <span className="edit-fab__icon">✎</span>
      {label}
    </button>
  );
}
