import { motion } from "framer-motion";

const ProgressIndicator = ({ steps, activeStep, progress }) => (
  <div className="progress-indicator">
    <div className="progress-track">
      <motion.div className="progress-fill" style={{ scaleY: progress, originY: 0 }} />
    </div>

    <div className="progress-dots">
      {steps.map((step, i) => {
        const isActive = i === activeStep;
        const isDone = i < activeStep;

        return (
          <motion.div
            key={step.id}
            className="progress-dot"
            animate={{
              scale: isActive ? 1.3 : 1,
              opacity: isActive || isDone ? 1 : 0.4,
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{
              borderColor: isActive || isDone ? step.color : "#1A2040",
              backgroundColor: isDone ? step.color : "transparent",
              boxShadow: isActive ? `0 0 12px ${step.color}` : "none",
            }}
          >
            <span className="dot-label" style={{ color: isActive || isDone ? step.color : "#8B97B8" }}>
              {step.number}
            </span>
          </motion.div>
        );
      })}
    </div>
  </div>
);

export default ProgressIndicator;
