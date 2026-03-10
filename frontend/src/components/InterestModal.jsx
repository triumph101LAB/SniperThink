import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const InterestModal = ({ step, onClose }) => {
  const [form, setForm] = useState({ name: "", email: "" });
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.email.trim()) {
      setStatus("error");
      setMessage("Please fill in both your name and email.");
      return;
    }
    if (!EMAIL_REGEX.test(form.email)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch(`${API_URL}/api/interested`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, step: step.title }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setMessage(data.message);
      } else {
        setStatus("error");
        setMessage(data.message || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Unable to connect. Please check your connection and try again.");
    }
  };

  const ctaBg = `linear-gradient(135deg, ${step.color}, ${step.id === "automate" ? "#d45520" : "#1a9e9e"})`;

  return (
    <AnimatePresence>
      <motion.div
        className="modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
        onClick={onClose}
      />

      <motion.div
        className="modal-panel"
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        style={{
          borderColor: step.color,
          boxShadow: `0 0 60px ${step.glowColor}, 0 30px 80px rgba(0,0,0,0.6)`,
          overflowY: "auto",
          maxHeight: "85vh",
          x: "-50%",
          y: "-50%",
        }}
      >
        <div className="modal-glow" style={{ background: `radial-gradient(ellipse at top, ${step.glowColor}, transparent 60%)` }} />
        <button className="modal-close" onClick={onClose}>✕</button>

        <div className="modal-header">
          <span className="modal-badge" style={{ color: step.color, borderColor: step.color }}>
            {step.number} — {step.title}
          </span>
          <h2 className="modal-title">Let's get you started</h2>
          <p className="modal-subtitle">
            Tell us about yourself and we'll reach out about{" "}
            <strong style={{ color: step.color }}>{step.title}</strong>.
          </p>
        </div>

        {status !== "success" ? (
          <>
            <div className="modal-fields">
              {[
                { label: "Your Name", name: "name", type: "text", placeholder: "e.g. John Doe" },
                { label: "Email Address", name: "email", type: "email", placeholder: "e.g. john@company.com" },
              ].map(({ label, name, type, placeholder }) => (
                <div key={name} className="field-group">
                  <label className="field-label">{label}</label>
                  <input
                    className="field-input"
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    value={form[name]}
                    onChange={handleChange}
                    disabled={status === "loading"}
                    style={{ "--focus-color": step.color }}
                  />
                </div>
              ))}
            </div>

            <AnimatePresence>
              {status === "error" && (
                <motion.p
                  className="modal-error"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  ⚠ {message}
                </motion.p>
              )}
            </AnimatePresence>

            <motion.button
              className="modal-submit"
              onClick={handleSubmit}
              disabled={status === "loading"}
              whileHover={{ scale: status === "loading" ? 1 : 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{ background: status === "loading" ? "#1A2040" : ctaBg }}
            >
              {status === "loading" ? (
                <span className="loading-spinner"><span className="spinner" />Sending...</span>
              ) : (
                "Send My Interest →"
              )}
            </motion.button>
          </>
        ) : (
          <motion.div className="modal-success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
            <motion.div
              className="success-icon"
              style={{ borderColor: step.color, color: step.color }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
            >
              ✓
            </motion.div>
            <p className="success-message">{message}</p>
            <button className="modal-close-btn" onClick={onClose}>Close</button>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default InterestModal;
