import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "../hooks/UseScrollProgress";

const TRANSITION = { duration: 0.7, ease: [0.22, 1, 0.36, 1] };

const cardVariants = {
  analyze:    { hidden: { opacity: 0, x: -80, skewX: -5 }, visible: { opacity: 1, x: 0, skewX: 0, transition: TRANSITION } },
  automate:   { hidden: { opacity: 0, y: 80, scale: 0.92 }, visible: { opacity: 1, y: 0, scale: 1, transition: TRANSITION } },
  accelerate: { hidden: { opacity: 0, x: 80, skewX: 5 },   visible: { opacity: 1, x: 0, skewX: 0, transition: TRANSITION } },
};

const StepCard = ({ step, onInterestClick }) => {
  const { ref, inView } = useInView(0.25);
  const [hovered, setHovered] = useState(false);
  const variant = cardVariants[step.id] || cardVariants.analyze;
  const ctaBg = `linear-gradient(135deg, ${step.color}, ${step.id === "automate" ? "#d45520" : "#1a9e9e"})`;

  return (
    <motion.div
      ref={ref}
      className={`step-card step-card--${step.id}`}
      variants={variant}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        borderColor: hovered ? step.color : "rgba(26, 32, 64, 0.8)",
        boxShadow: hovered ? `0 0 40px ${step.glowColor}, 0 20px 60px rgba(0,0,0,0.4)` : "0 4px 30px rgba(0,0,0,0.3)",
      }}
    >
      <motion.div
        className="card-glow"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ background: `radial-gradient(ellipse at top left, ${step.glowColor}, transparent 70%)` }}
      />

      <motion.span className="card-number-bg" animate={{ opacity: hovered ? 0.06 : 0.03 }} style={{ color: step.color }}>
        {step.number}
      </motion.span>

      <div className="card-header">
        <motion.div
          className="card-number-badge"
          style={{ borderColor: step.color, color: step.color }}
          animate={{ boxShadow: hovered ? `0 0 16px ${step.color}` : "none" }}
          transition={{ duration: 0.3 }}
        >
          {step.number}
        </motion.div>
        <motion.h3 className="card-title" animate={{ color: hovered ? step.color : "#fff" }} transition={{ duration: 0.3 }}>
          {step.title}
        </motion.h3>
      </div>

      <h2 className="card-headline">
        {step.headline.split("\n").map((line, i, arr) => (
          <span key={i} className="headline-line">{line}{i < arr.length - 1 && <br />}</span>
        ))}
      </h2>

      <p className="card-description">{step.description}</p>

      <ul className="card-details">
        {step.details.map((detail, i) => (
          <motion.li
            key={i}
            custom={i}
            variants={{
              hidden: { opacity: 0, x: -20 },
              visible: { opacity: 1, x: 0, transition: { delay: 0.3 + i * 0.12, duration: 0.5, ease: "easeOut" } },
            }}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="card-detail-item"
          >
            <span className="detail-dot" style={{ backgroundColor: step.color }} />
            {detail}
          </motion.li>
        ))}
      </ul>

      <motion.button
        className="card-cta"
        onClick={() => onInterestClick(step)}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        style={{ background: ctaBg }}
      >
        I'm Interested <span className="cta-arrow">→</span>
      </motion.button>
    </motion.div>
  );
};

export default StepCard;
