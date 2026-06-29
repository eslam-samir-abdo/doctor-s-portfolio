import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminProvider } from "./context/AdminContext";
import IntroAnimation from "./components/IntroAnimation";
import PageLoader from "./components/PageLoader";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Experience from "./pages/Experience";
import Certificates from "./pages/Certificates";
import Skills from "./pages/Skills";
import Contact from "./pages/Contact";
import AdminLogin from "./pages/AdminLogin";
import { usePortfolioData } from "./hooks/usePortfolioData";
import { initialAbout } from "./data/initialData";

function AppShell() {
  const [about] = usePortfolioData("reham_about", initialAbout);

  return (
    <>
      <IntroAnimation onFinish={() => {}} />
      <PageLoader />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/certificates" element={<Certificates />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<AdminLogin />} />
        </Routes>
      </main>
      <Footer about={about} />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <AdminProvider>
        <AppShell />
      </AdminProvider>
    </BrowserRouter>
  );
}
