import React, { useState } from "react";
import { useAdmin } from "../context/AdminContext";
import { usePortfolioData } from "../hooks/usePortfolioData";
import { useReveal } from "../hooks/useReveal";
import { initialAbout } from "../data/initialData";
import EditFab from "../components/EditFab";
import Modal from "../components/Modal";
import "./Contact.css";

export default function Contact() {
  const { isAdmin } = useAdmin();
  const [about, setAbout] = usePortfolioData("reham_about", initialAbout);
  const [showEdit, setShowEdit] = useState(false);
  const [form, setForm] = useState(about);
  const ref = useReveal();

  const openEdit = () => {
    setForm(about);
    setShowEdit(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setAbout(form);
    setShowEdit(false);
  };

  return (
    <div className="section contact-page" style={{ position: "relative" }}>
      <EditFab onClick={openEdit} label="Edit contact info" />
      <div className="container">
        <div className="contact-card reveal" ref={ref}>
          <div className="contact-card__intro">
            <span className="eyebrow">Get in touch</span>
            <h1 className="section-title">Let's talk regulatory</h1>
            <p className="page-header__sub">
              Open to opportunities in regulatory affairs, pharmacovigilance, and pharmaceutical compliance.
            </p>
          </div>

          <div className="contact-list">
            <ContactRow icon="✉" label="Email" value={about.email} href={`mailto:${about.email}`} />
            <ContactRow icon="☎" label="Phone" value={about.phone} href={`tel:${about.phone}`} />
            <ContactRow icon="📍" label="Location" value={about.location} />
            <ContactRow icon="in" label="LinkedIn" value="View profile" href={about.linkedin} mono />
          </div>
        </div>
      </div>

      {isAdmin && showEdit && (
        <Modal title="Edit contact info" onClose={() => setShowEdit(false)} width={480}>
          <form onSubmit={handleSave}>
            <div className="form-field">
              <label>Email</label>
              <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
            <div className="form-field">
              <label>Phone</label>
              <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </div>
            <div className="form-field">
              <label>Location</label>
              <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
            </div>
            <div className="form-field">
              <label>LinkedIn URL</label>
              <input value={form.linkedin} onChange={(e) => setForm({ ...form, linkedin: e.target.value })} />
            </div>
            <div className="form-actions">
              <button type="button" className="btn btn-ghost" onClick={() => setShowEdit(false)}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

function ContactRow({ icon, label, value, href, mono }) {
  const content = (
    <>
      <span className="contact-row__icon">{icon}</span>
      <span className="contact-row__text">
        <span className="contact-row__label">{label}</span>
        <span className={mono ? "contact-row__value--mono" : "contact-row__value"}>{value}</span>
      </span>
    </>
  );

  return href ? (
    <a href={href} className="contact-row" target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
      {content}
    </a>
  ) : (
    <div className="contact-row">{content}</div>
  );
}
