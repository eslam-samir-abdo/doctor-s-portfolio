// Initial seed data derived from Reham Samir's CV.
// This is only used the FIRST time the site loads — after that,
// everything is read from localStorage so admin edits persist.

export const initialAbout = {
  name: "Reham Samir",
  title: "Pharm-D | Regulatory Affairs",
  tagline:
    "Faculty of Pharmacy graduate (Cairo University) specialized in regulatory documentation and compliance — bridging pharmaceutical science with the paperwork that gets medicine to patients safely.",
  bio:
    "I'm a licensed pharmacist with hands-on experience across community pharmacy, pharmaceutical data mapping, and regulatory affairs. My work centers on making sure products meet local and international requirements — from EDA submissions to product classification and licensing — with the same attention to detail I'd want for my own family's medicine cabinet.",
  email: "reham.samir@example.com",
  phone: "01100653757",
  location: "Warraq, Giza, Egypt",
  linkedin: "https://linkedin.com/in/reham-samir",
  university: "Faculty of Pharmacy, Cairo University",
  degree: "Pharm-D Bachelor — Excellent, cGPA 3.5/4 (Class of 2025)",
};

export const initialExperience = [
  {
    id: "exp-1",
    role: "Pharmacist Mapping Specialist",
    company: "LAVIVA Health",
    period: "Nov 2025 — Present",
    current: true,
    description:
      "Organizing and mapping pharmacy and medication data to support health-tech solutions and improve pharmaceutical system efficiency.",
  },
  {
    id: "exp-2",
    role: "Regulatory Affairs Intern",
    company: "Greenline-Egy",
    period: "Aug 2025",
    current: false,
    description:
      "Built foundational knowledge of local and international regulatory requirements (Egyptian Drug Authority, EMA, FDA). Worked on regulatory submissions, product classification, and licensing procedures.",
  },
  {
    id: "exp-3",
    role: "Community Pharmacist",
    company: "Dr. Samir Pharmacy",
    period: "Jan 2021 — Aug 2023",
    current: false,
    description:
      "Dispensed medications, counseled patients, and ensured safe and effective drug use in a retail pharmacy setting.",
  },
];

export const initialCertificates = [
  {
    id: "cert-1",
    title: "EDA Certificate — Regulatory Affairs of Medical Devices",
    issuer: "Egyptian Drug Authority",
    date: "Dec 2025",
  },
  {
    id: "cert-2",
    title: "EDA Certificate — Regulatory Affairs of Pharmaceutical Products",
    issuer: "Egyptian Drug Authority",
    date: "Dec 2025",
  },
  {
    id: "cert-3",
    title: "Regulatory Affairs Internship — Certificate of Completion",
    issuer: "Greenline-Egy",
    date: "Nov 2025",
  },
  {
    id: "cert-4",
    title: "Entry Level Course in Regulatory Affairs",
    issuer: "—",
    date: "Nov 2025",
  },
  {
    id: "cert-5",
    title: "2nd Best Project — Pharmacology Course",
    issuer: "Faculty of Pharmacy, Cairo University",
    date: "2025",
  },
  {
    id: "cert-6",
    title: "Online Diploma — Medical Coding and Billing",
    issuer: "—",
    date: "2024",
  },
  {
    id: "cert-7",
    title: "Best Participant — Rameda Pharmaceutical Internship",
    issuer: "Rameda",
    date: "2024",
  },
];

export const initialSkills = {
  technical: [
    { id: "skill-1", name: "Regulatory Documentation", level: 90 },
    { id: "skill-2", name: "EDA / EMA / FDA Requirements", level: 85 },
    { id: "skill-3", name: "Product Classification & Licensing", level: 80 },
    { id: "skill-4", name: "Pharmaceutical Data Mapping", level: 85 },
    { id: "skill-5", name: "Patient Counseling", level: 90 },
  ],
  tools: [
    "Microsoft Office",
    "Google Docs & Sheets",
    "Meta Ads Manager",
    "Gamma AI",
    "Dreamfora",
    "ChatGPT",
    "Gemini",
    "GS1",
    "EDA Portal",
  ],
  soft: [
    "Critical Thinking",
    "Attention to Detail",
    "Problem Solving",
    "Communication",
    "Time Management",
    "Adaptability",
    "Collaboration",
    "Resilience",
  ],
  languages: [
    { name: "Arabic", level: "Native" },
    { name: "English", level: "Fluent" },
  ],
};
