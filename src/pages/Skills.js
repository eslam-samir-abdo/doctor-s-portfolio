import React, { useState } from "react";
import { useAdmin } from "../context/AdminContext";
import { usePortfolioData } from "../hooks/usePortfolioData";
import { useReveal } from "../hooks/useReveal";
import { initialSkills } from "../data/initialData";
import EditFab from "../components/EditFab";
import Modal from "../components/Modal";
import "./Skills.css";

export default function Skills() {
  const { isAdmin } = useAdmin();
  const [skills, setSkills] = usePortfolioData("reham_skills", initialSkills);
  const [showEdit, setShowEdit] = useState(false);
  const [form, setForm] = useState(skills);

  const headerRef = useReveal();
  const barsRef = useReveal();
  const tagsRef = useReveal();

  const openEdit = () => {
    setForm({
      ...skills,
      toolsText: skills.tools.join(", "),
      softText: skills.soft.join(", "),
    });
    setShowEdit(true);
  };

  const updateTechnical = (index, field, value) => {
    const updated = [...form.technical];
    updated[index] = { ...updated[index], [field]: field === "level" ? Number(value) : value };
    setForm({ ...form, technical: updated });
  };

  const addTechnical = () => {
    setForm({
      ...form,
      technical: [...form.technical, { id: `skill-${Date.now()}`, name: "New skill", level: 50 }],
    });
  };

  const removeTechnical = (index) => {
    setForm({ ...form, technical: form.technical.filter((_, i) => i !== index) });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSkills({
      technical: form.technical,
      tools: form.toolsText.split(",").map((s) => s.trim()).filter(Boolean),
      soft: form.softText.split(",").map((s) => s.trim()).filter(Boolean),
      languages: form.languages,
    });
    setShowEdit(false);
  };

  return (
    <div className="section skills-page" style={{ position: "relative" }}>
      <EditFab onClick={openEdit} label="Edit skills" />
      <div className="container">
        <div className="page-header reveal" ref={headerRef}>
          <span className="eyebrow">Capabilities</span>
          <h1 className="section-title">Skills &amp; Tools</h1>
          <p className="page-header__sub">
            A blend of clinical know-how, regulatory fluency, and the tools that keep submissions moving.
          </p>
        </div>

        <div className="skills-bars reveal" ref={barsRef}>
          {skills.technical.map((skill) => (
            <SkillBar key={skill.id} skill={skill} />
          ))}
        </div>

        <div className="skills-tags-grid reveal" ref={tagsRef}>
          <TagGroup title="Tools & Technologies" items={skills.tools} />
          <TagGroup title="Soft Skills" items={skills.soft} accent />
          <div className="tag-group">
            <h3 className="tag-group__title">Languages</h3>
            <div className="lang-list">
              {skills.languages.map((lang) => (
                <div className="lang-row" key={lang.name}>
                  <span>{lang.name}</span>
                  <span className="lang-row__level">{lang.level}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {isAdmin && showEdit && (
        <Modal title="Edit skills" onClose={() => setShowEdit(false)} width={620}>
          <form onSubmit={handleSave}>
            <h4 className="modal-subhead">Technical skills</h4>
            {form.technical.map((skill, i) => (
              <div className="skill-edit-row" key={skill.id}>
                <input
                  value={skill.name}
                  onChange={(e) => updateTechnical(i, "name", e.target.value)}
                  placeholder="Skill name"
                />
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={skill.level}
                  onChange={(e) => updateTechnical(i, "level", e.target.value)}
                />
                <button type="button" className="icon-btn icon-btn--danger" onClick={() => removeTechnical(i)}>
                  ✕
                </button>
              </div>
            ))}
            <button type="button" className="btn btn-ghost" onClick={addTechnical} style={{ marginBottom: 20 }}>
              + Add skill
            </button>

            <div className="form-field">
              <label>Tools & Technologies (comma-separated)</label>
              <textarea value={form.toolsText} onChange={(e) => setForm({ ...form, toolsText: e.target.value })} />
            </div>
            <div className="form-field">
              <label>Soft Skills (comma-separated)</label>
              <textarea value={form.softText} onChange={(e) => setForm({ ...form, softText: e.target.value })} />
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

function SkillBar({ skill }) {
  const ref = useReveal();
  return (
    <div className="skill-bar reveal" ref={ref}>
      <div className="skill-bar__label">
        <span>{skill.name}</span>
        <span className="skill-bar__pct">{skill.level}%</span>
      </div>
      <div className="skill-bar__track">
        <div className="skill-bar__fill" style={{ "--target-width": `${skill.level}%` }} />
      </div>
    </div>
  );
}

function TagGroup({ title, items, accent }) {
  return (
    <div className="tag-group">
      <h3 className="tag-group__title">{title}</h3>
      <div className="tag-cloud">
        {items.map((item) => (
          <span key={item} className={`tag ${accent ? "tag--accent" : ""}`}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
