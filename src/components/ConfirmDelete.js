import React from "react";
import Modal from "./Modal";

export default function ConfirmDelete({ itemName, onConfirm, onCancel }) {
  return (
    <Modal title="Delete this item?" onClose={onCancel} width={420}>
      <p style={{ marginBottom: 20, color: "var(--color-ink)", lineHeight: 1.6 }}>
        Are you sure you want to delete <strong>{itemName}</strong>? This can't be undone.
      </p>
      <div className="form-actions">
        <button className="btn btn-ghost" onClick={onCancel}>
          Cancel
        </button>
        <button className="btn btn-danger" onClick={onConfirm}>
          Delete
        </button>
      </div>
    </Modal>
  );
}
