import React, { useState } from "react";
import { useAdmin } from "../context/AdminContext";
import { usePortfolioData } from "../hooks/usePortfolioData";
import { useReveal } from "../hooks/useReveal";
import { initialExperience } from "../data/initialData";
import Modal from "../components/Modal";
import ConfirmDelete from "../components/ConfirmDelete";
import "./Experience.css";

const emptyForm = { role: "", company: "", period: "", current: false, description: "" };

export default function Experience() {
  const { isAdmin } = useAdmin();
  const [experience, setExperience] = usePortfolioData("reham_experience", initialExperience);
  const [editing, setEditing] = useState(null); // null | "new" | item
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
      const newItem = { ...form, id: `exp-${Date.now()}` };
      setExperience([newItem, ...experience]);
    } else {
      setExperience(experience.map((it) => (it.id === editing.id ? { ...form, id: it.id } : it)));
    }
    setEditing(null);
  };

  const handleDelete = () => {
    setExperience(experience.filter((it) => it.id !== deleting.id));
    setDeleting(null);
  };

  return (
    <div className="section experience-page">
      <div className="container">
        <div className="page-header reveal" ref={headerRef}>
          <span className="eyebrow">Career path</span>
          <h1 className="section-title">Experience</h1>
          <p className="page-header__sub">
            From the pharmacy counter to regulatory dossiers — a track record built on accuracy.
          </p>
        </div>

        {isAdmin && (
          <button className="btn btn-primary edit-fab--add" onClick={openNew}>
            + Add experience
          </button>
        )}

        <div className="timeline">
          {experience.map((item, i) => (
            <TimelineItem key={item.id} item={item} index={i} isAdmin={isAdmin} onEdit={() => openEdit(item)} onDelete={() => setDeleting(item)} />
          ))}
        </div>

        {experience.length === 0 && (
          <p className="empty-state">No experience added yet. Use "Add experience" to get started.</p>
        )}
      </div>

      {editing && (
        <Modal title={editing === "new" ? "Add experience" : "Edit experience"} onClose={() => setEditing(null)}>
          <form onSubmit={handleSave}>
            <div className="form-field">
              <label>Role</label>
              <input required value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
            </div>
            <div className="form-field">
              <label>Company</label>
              <input required value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
            </div>
            <div className="form-field">
              <label>Period (e.g. Nov 2025 — Present)</label>
              <input required value={form.period} onChange={(e) => setForm({ ...form, period: e.target.value })} />
            </div>
            <div className="form-field">
              <label>Description</label>
              <textarea required value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </div>
            <label className="checkbox-field">
              <input
                type="checkbox"
                checked={form.current}
                onChange={(e) => setForm({ ...form, current: e.target.checked })}
              />
              This is a current role
            </label>
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
        <ConfirmDelete itemName={`"${deleting.role}" at ${deleting.company}`} onConfirm={handleDelete} onCancel={() => setDeleting(null)} />
      )}
    </div>
  );
}

function TimelineItem({ item, index, isAdmin, onEdit, onDelete }) {
  const ref = useReveal();
  return (
    <div className="timeline__item reveal" ref={ref} style={{ animationDelay: `${index * 0.08}s` }}>
      <div className="timeline__marker">
        <span className={`timeline__dot ${item.current ? "timeline__dot--current" : ""}`} />
        {index < 99 && <span className="timeline__line" />}
      </div>
      <div className="timeline__card">
        {item.current && <span className="timeline__badge">Current</span>}
        <span className="timeline__period">{item.period}</span>
        <h3 className="timeline__role">{item.role}</h3>
        <p className="timeline__company">{item.company}</p>
        <p className="timeline__desc">{item.description}</p>

        {isAdmin && (
          <div className="timeline__actions">
            <button onClick={onEdit} className="icon-btn">✎ Edit</button>
            <button onClick={onDelete} className="icon-btn icon-btn--danger">🗑 Delete</button>
          </div>
        )}
      </div>
    </div>
  );
}
