import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";
import { usePortfolioData } from "../hooks/usePortfolioData";
import { useReveal } from "../hooks/useReveal";
import { initialAbout, initialExperience, initialCertificates } from "../data/initialData";
import EditFab from "../components/EditFab";
import Modal from "../components/Modal";
import "./Home.css";

export default function Home() {
  const { isAdmin } = useAdmin();
  const [about, setAbout] = usePortfolioData("reham_about", initialAbout);
  const [experience] = usePortfolioData("reham_experience", initialExperience);
  const [certificates] = usePortfolioData("reham_certificates", initialCertificates);
  const [showEdit, setShowEdit] = useState(false);
  const [form, setForm] = useState(about);

  const heroRef = useReveal();
  const aboutRef = useReveal();
  const previewRef = useReveal();

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
    <>
      {/* ===== Hero ===== */}
      <section className="hero">
        <div className="hero__pattern" aria-hidden="true">
          <svg width="100%" height="100%" viewBox="0 0 600 600" preserveAspectRatio="none">
            <defs>
              <pattern id="hexgrid" width="56" height="98" patternUnits="userSpaceOnUse">
                <polygon
                  points="28,0 56,16 56,49 28,65 0,49 0,16"
                  fill="none"
                  stroke="rgba(15,76,76,0.16)"
                  strokeWidth="1.2"
                />
              </pattern>
            </defs>
            <rect width="600" height="600" fill="url(#hexgrid)" />
          </svg>
        </div>

        <div className="hero__capsule hero__capsule--1" aria-hidden="true" />
        <div className="hero__capsule hero__capsule--2" aria-hidden="true" />

        <div className="container hero__inner reveal is-visible" ref={heroRef}>
          <span className="eyebrow">Regulatory Affairs · Pharm-D</span>
          <h1 className="hero__title">
            {about.name}
            <span className="hero__title-accent"> — turning compliance into clarity.</span>
          </h1>
          <p className="hero__tagline">{about.tagline}</p>

          <div className="hero__actions">
            <Link to="/experience" className="btn btn-primary">
              View experience
            </Link>
            <Link to="/contact" className="btn btn-ghost">
              Get in touch
            </Link>
          </div>

          <div className="hero__seal" aria-hidden="true">
            <svg viewBox="0 0 140 140" width="120" height="120">
              <circle cx="70" cy="70" r="62" fill="none" stroke="var(--color-gold)" strokeWidth="2" />
              <circle cx="70" cy="70" r="50" fill="none" stroke="var(--color-gold)" strokeWidth="1" strokeDasharray="2 5" />
              <text x="70" y="64" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="var(--color-deep-teal)" letterSpacing="2">
                EDA · EMA
              </text>
              <text x="70" y="80" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="var(--color-deep-teal)" letterSpacing="2">
                FDA
              </text>
            </svg>
          </div>
        </div>
      </section>

      {/* ===== About ===== */}
      <section className="section about" style={{ position: "relative" }}>
        <EditFab onClick={openEdit} label="Edit about" />
        <div className="container about__grid reveal" ref={aboutRef}>
          <div>
            <span className="eyebrow">About</span>
            <h2 className="section-title">A regulatory mind with a clinical foundation</h2>
          </div>
          <div className="about__body">
            <p>{about.bio}</p>
            <div className="about__facts">
              <div className="about__fact">
                <span className="about__fact-label">Education</span>
                <span>{about.university}</span>
                <span className="about__fact-muted">{about.degree}</span>
              </div>
              <div className="about__fact">
                <span className="about__fact-label">Based in</span>
                <span>{about.location}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Quick previews ===== */}
      <section className="section preview-section">
        <div className="container reveal" ref={previewRef}>
          <div className="preview-grid">
            <div className="preview-card">
              <span className="eyebrow">Latest role</span>
              <h3>{experience[0]?.role}</h3>
              <p className="preview-card__meta">
                {experience[0]?.company} · {experience[0]?.period}
              </p>
              <Link to="/experience" className="preview-card__link">
                See full timeline →
              </Link>
            </div>
            <div className="preview-card">
              <span className="eyebrow">Certifications</span>
              <h3>{certificates.length} credentials on file</h3>
              <p className="preview-card__meta">
                Including {certificates[0]?.title.split(" — ")[0]}
              </p>
              <Link to="/certificates" className="preview-card__link">
                View certificates →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {isAdmin && showEdit && (
        <Modal title="Edit about section" onClose={() => setShowEdit(false)} width={560}>
          <form onSubmit={handleSave}>
            <div className="form-field">
              <label>Full name</label>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="form-field">
              <label>Title</label>
              <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </div>
            <div className="form-field">
              <label>Tagline (shown in hero)</label>
              <textarea value={form.tagline} onChange={(e) => setForm({ ...form, tagline: e.target.value })} />
            </div>
            <div className="form-field">
              <label>Bio</label>
              <textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} />
            </div>
            <div className="form-field">
              <label>University</label>
              <input value={form.university} onChange={(e) => setForm({ ...form, university: e.target.value })} />
            </div>
            <div className="form-field">
              <label>Degree</label>
              <input value={form.degree} onChange={(e) => setForm({ ...form, degree: e.target.value })} />
            </div>
            <div className="form-field">
              <label>Location</label>
              <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
            </div>
            <div className="form-field">
              <label>Email</label>
              <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
            <div className="form-field">
              <label>Phone</label>
              <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
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
    </>
  );
}
