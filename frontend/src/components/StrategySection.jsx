import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
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
    const observers = steps.map((_, i) => {
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveStep(i); },
        { threshold: 0.5 }
      );
      if (stepRefs.current[i]) observer.observe(stepRefs.current[i]);
      return observer;
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const openModal = (step) => {
    setSelectedStep(step);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
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
                {introData.headline.split("\n").map((line, i, arr) => (
                  <span key={i} className="intro-headline-line">{line}{i < arr.length - 1 && <br />}</span>
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
              {steps.map((step, i) => (
                <div key={step.id} ref={(el) => (stepRefs.current[i] = el)} className="step-wrapper">
                  <StepCard step={step} index={i} onInterestClick={openModal} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {selectedStep && createPortal(
        <InterestModal step={selectedStep} onClose={closeModal} />,
        document.body
      )}
    </>
  );
};

export default StrategySection;
