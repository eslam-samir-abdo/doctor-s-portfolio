import React, { useState } from "react";
import { useAdmin } from "../context/AdminContext";
import { usePortfolioData } from "../hooks/usePortfolioData";
import { useReveal } from "../hooks/useReveal";
import { initialCertificates } from "../data/initialData";
import Modal from "../components/Modal";
import ConfirmDelete from "../components/ConfirmDelete";
import "./Certificates.css";

const emptyForm = { title: "", issuer: "", date: "" };

export default function Certificates() {
  const { isAdmin } = useAdmin();
  const [certificates, setCertificates] = usePortfolioData("reham_certificates", initialCertificates);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const headerRef = useReveal();

  const openNew = () => {
    setForm(emptyForm);
    setEditing("new");
  };

  const openEdit = (item) => {
    setForm(item);
    setEditing(item);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (editing === "new") {
      setCertificates([{ ...form, id: `cert-${Date.now()}` }, ...certificates]);
    } else {
      setCertificates(certificates.map((c) => (c.id === editing.id ? { ...form, id: c.id } : c)));
    }
    setEditing(null);
  };

  const handleDelete = () => {
    setCertificates(certificates.filter((c) => c.id !== deleting.id));
    setDeleting(null);
  };

  return (
    <div className="section certificates-page">
      <div className="container">
        <div className="page-header reveal" ref={headerRef}>
          <span className="eyebrow">Credentials</span>
          <h1 className="section-title">Certificates &amp; Trainings</h1>
          <p className="page-header__sub">
            Every stamp here represents hours of study in regulatory frameworks — EDA, EMA, and FDA included.
          </p>
        </div>

        {isAdmin && (
          <button className="btn btn-primary edit-fab--add" onClick={openNew}>
            + Add certificate
          </button>
        )}

        <div className="cert-grid">
          {certificates.map((cert, i) => (
            <CertCard key={cert.id} cert={cert} index={i} isAdmin={isAdmin} onEdit={() => openEdit(cert)} onDelete={() => setDeleting(cert)} />
          ))}
        </div>

        {certificates.length === 0 && (
          <p className="empty-state">No certificates added yet.</p>
        )}
      </div>

      {editing && (
        <Modal title={editing === "new" ? "Add certificate" : "Edit certificate"} onClose={() => setEditing(null)} width={460}>
          <form onSubmit={handleSave}>
            <div className="form-field">
              <label>Title</label>
              <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </div>
            <div className="form-field">
              <label>Issuer</label>
              <input value={form.issuer} onChange={(e) => setForm({ ...form, issuer: e.target.value })} />
            </div>
            <div className="form-field">
              <label>Date</label>
              <input required value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} placeholder="e.g. Dec 2025" />
            </div>
            <div className="form-actions">
              <button type="button" className="btn btn-ghost" onClick={() => setEditing(null)}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </div>
          </form>
        </Modal>
      )}

      {deleting && (
        <ConfirmDelete itemName={`"${deleting.title}"`} onConfirm={handleDelete} onCancel={() => setDeleting(null)} />
      )}
    </div>
  );
}

function CertCard({ cert, index, isAdmin, onEdit, onDelete }) {
  const ref = useReveal();
  return (
    <div className="cert-card reveal" ref={ref} style={{ animationDelay: `${(index % 6) * 0.07}s` }}>
      <div className="cert-card__seal" aria-hidden="true">
        <svg viewBox="0 0 80 80" width="46" height="46">
          <circle cx="40" cy="40" r="36" fill="none" stroke="var(--color-gold)" strokeWidth="2" />
          <circle cx="40" cy="40" r="28" fill="none" stroke="var(--color-gold)" strokeWidth="1" strokeDasharray="2 3" />
          <path d="M28 41l8 8 16-18" fill="none" stroke="var(--color-deep-teal)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <span className="cert-card__date">{cert.date}</span>
      <h3 className="cert-card__title">{cert.title}</h3>
      {cert.issuer && cert.issuer !== "—" && <p className="cert-card__issuer">{cert.issuer}</p>}

      {isAdmin && (
        <div className="cert-card__actions">
          <button onClick={onEdit} className="icon-btn">✎ Edit</button>
          <button onClick={onDelete} className="icon-btn icon-btn--danger">🗑 Delete</button>
        </div>
      )}
    </div>
  );
}
