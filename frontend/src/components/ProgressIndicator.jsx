import { motion } from "framer-motion";

const ProgressIndicator = ({ steps, activeStep, progress }) => {
  return (
    <div className="progress-indicator">
      {/* Vertical scroll-driven progress track */}
      <div className="progress-track">
        <motion.div
          className="progress-fill"
          style={{ scaleY: progress, originY: 0 }}
        />
      </div>

      {/* Step dots */}
      <div className="progress-dots">
        {steps.map((step, index) => {
          const isActive = index === activeStep;
          const isDone = index < activeStep;

          return (
            <motion.div
              key={step.id}
              className={`progress-dot ${isActive ? "active" : ""} ${isDone ? "done" : ""}`}
              initial={{ scale: 0.8, opacity: 0.4 }}
              animate={{
                scale: isActive ? 1.3 : 1,
                opacity: isActive || isDone ? 1 : 0.4,
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{
                borderColor: isActive ? step.color : isDone ? step.color : "#1A2040",
                backgroundColor: isDone ? step.color : isActive ? "transparent" : "transparent",
                boxShadow: isActive ? `0 0 12px ${step.color}` : "none",
              }}
            >
              {/* Step number inside dot */}
              <span
                className="dot-label"
                style={{ color: isActive || isDone ? step.color : "#8B97B8" }}
              >
                {step.number}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressIndicator;
