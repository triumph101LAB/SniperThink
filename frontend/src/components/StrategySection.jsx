import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { createPortal } from "react-dom";
import StepCard from "./StepCard";
import ProgressIndicator from "./ProgressIndicator";
import InterestModal from "./InterestModal";
import { steps, introData } from "../data/steps";
import { useScrollProgress } from "../hooks/UseScrollProgress";

const StrategySection = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedStep, setSelectedStep] = useState(null);
  const { ref: sectionRef, progress } = useScrollProgress();
  const stepRefs = useRef([]);

  useEffect(() => {
    const observers = steps.map((_, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveStep(index); },
        { threshold: 0.5 }
      );
      if (stepRefs.current[index]) observer.observe(stepRefs.current[index]);
      return observer;
    });
    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  const handleInterestClick = (step) => {
    setSelectedStep(step);
    document.body.style.overflow = "hidden";
  };

  const handleModalClose = () => {
    setSelectedStep(null);
    document.body.style.overflow = "";
  };

  return (
    <>
      <section className="strategy-section" ref={sectionRef}>
        <div className="section-bg-glow" />

        <div className="strategy-inner">
          <aside className="strategy-sidebar">
            <div className="sidebar-sticky">
              <ProgressIndicator steps={steps} activeStep={activeStep} progress={progress} />
            </div>
          </aside>

          <div className="strategy-content">
            <motion.div
              className="strategy-intro"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="intro-eyebrow">{introData.eyebrow}</span>
              <h1 className="intro-headline">
                {introData.headline.split("\n").map((line, i) => (
                  <span key={i} className="intro-headline-line">
                    {line}
                    {i < introData.headline.split("\n").length - 1 && <br />}
                  </span>
                ))}
              </h1>
              <p className="intro-subtext">{introData.subtext}</p>

              <motion.div
                className="scroll-cue"
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
              >
                <span>Scroll to explore</span>
                <span className="scroll-arrow">↓</span>
              </motion.div>
            </motion.div>

            <div className="steps-list">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  ref={(el) => (stepRefs.current[index] = el)}
                  className="step-wrapper"
                >
                  <StepCard step={step} index={index} onInterestClick={handleInterestClick} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {selectedStep && createPortal(
        <InterestModal step={selectedStep} onClose={handleModalClose} />,
        document.body
      )}
    </>
  );
};

export default StrategySection;