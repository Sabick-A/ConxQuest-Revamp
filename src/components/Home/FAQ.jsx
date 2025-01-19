import React, { useState ,useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import AnimatedText from "./AnimatedText";

const FAQSection = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(5, 46, 22);
  position: relative;
  overflow: hidden;
  margin-top: -2px;
  padding-top: 82px;
`;

const Background = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  z-index: 1;
  background: linear-gradient(
    120deg,
    rgba(5, 46, 22, 0.95) 0%,
    rgba(5, 46, 22, 0.98) 100%
  );
`;

const StarField = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-content: space-around;
  opacity: 0.25;
`;

const Star = styled(motion.div)`
  position: absolute;
  width: ${(props) => props.size || "12px"};
  height: ${(props) => props.size || "12px"};
  clip-path: polygon(
    50% 0%,
    61% 35%,
    98% 35%,
    68% 57%,
    79% 91%,
    50% 70%,
    21% 91%,
    32% 57%,
    2% 35%,
    39% 35%
  );
  background: linear-gradient(135deg, #4ade80 0%, #14532d 100%);
  opacity: ${(props) => props.brightness || 0.8};
  box-shadow: 0 0 ${(props) => props.glow || "8px"} rgba(74, 222, 128, 0.4);
`;

const FAQContainer = styled.div`
  max-width: 1200px;
  width: 90%;
  margin: 0 auto;
  z-index: 2;
  padding: 2rem;
  position: relative;
`;

const FAQItem = styled(motion.div)`
  background: rgba(20, 83, 45, 0.6);
  border: 1px solid rgba(74, 222, 128, 0.2);
  border-radius: 8px;
  margin-bottom: 1rem;
  overflow: hidden;
  backdrop-filter: blur(10px);
  position: relative;
  z-index: 2;

  &:hover {
    border-color: rgba(74, 222, 128, 0.4);
    background: rgba(20, 83, 45, 0.7);
  }
`;

const FAQQuestion = styled.div`
  padding: 1rem;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #4ade80;
  font-weight: 600;

  &:hover {
    background: rgba(74, 222, 128, 0.1);
  }
`;

const FAQAnswer = styled(motion.div)`
  padding: 0 1rem;
  color: #e2e8f0;
  overflow: hidden;
`;

const Title = styled(motion.h1)`
  opacity: 0;
  padding-top: 6rem;
  transform: translateY(20px);
  animation: titleAppear 0.8s ease-out forwards;
  margin-bottom: 4rem;
  position: relative;
  z-index: 20;
  font-size: 3rem;
  text-align: center;

  @media (max-width: 1024px) {
    font-size: 3rem;
    padding-top: 4rem;
    margin-bottom: 3rem;
  }

  @media (max-width: 768px) {
    font-size: 2.2rem;
    padding-top: 1.5rem;
    margin-bottom: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.8rem;
    padding-top: 0.5rem;
    margin-bottom: 1rem;
  }

  @keyframes titleAppear {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 4px;
    background: linear-gradient(90deg, transparent, #4ade80, transparent);
    border-radius: 2px;

    @media (max-width: 768px) {
      width: 60px;
      height: 3px;
      bottom: -5px;
    }
  }
`;

const faqData = [
  {
    question: "What is ConxQuest?",
    answer:
      "ConxQuest is a gamified learning platform designed to teach children about the Constitution in an engaging and interactive way.",
  },
  {
    question: "Do I need to sign up to play the game?",
    answer:
      "No, signup is not required. You can start playing immediately by clicking the Start Game button on the landing page.",
  },
  {
    question: "How does the game work?",
    answer:
      "Navigate a 2D map, explore different locations, access educational resources, and complete games and challenges. Unlock new levels as you progress.",
  },
  {
    question: "What age group is ConxQuest suitable for?",
    answer:
      "ConxQuest is designed primarily for children, but anyone interested in learning about the Constitution in a fun and interactive way can enjoy it.",
  },
  {
    question:
      "Is there a way to ask questions about the Constitution during gameplay?",
    answer:
      "Yes, the game includes a fine-tuned chatbot that answers your queries about the Constitution in real time.",
  },
];

function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Generate a starry background with different sized stars
  const stars = Array.from({ length: 80 }, (_, i) => {
    const size = Math.random() * 12 + 8 + "px"; // Random size between 8-20px
    const left = Math.random() * 100 + "%";
    const top = Math.random() * 100 + "%";
    const brightness = Math.random() * 0.6 + 0.4; // Increased brightness range
    const glow = Math.random() * 12 + 6 + "px"; // Increased glow effect

    return (
      <Star
        key={i}
        size={size}
        brightness={brightness}
        glow={glow}
        initial={{
          opacity: 0,
          scale: 0,
          x: left,
          y: top,
        }}
        animate={{
          opacity: brightness,
          scale: [1, 1.3, 1], // Increased scale effect
          rotate: [0, 180, 0],
          transition: {
            opacity: {
              duration: 0.5,
              delay: i * 0.02,
            },
            scale: {
              repeat: Infinity,
              duration: 2.5 + Math.random() * 2,
              ease: "easeInOut",
            },
            rotate: {
              repeat: Infinity,
              duration: 5 + Math.random() * 3,
              ease: "linear",
            },
          },
        }}
        style={{
          position: "absolute",
          left,
          top,
          filter: `hue-rotate(${Math.random() * 30}deg)`,
        }}
      />
    );
  });
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    const section = document.getElementById("faq");
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  return (
    <FAQSection id="faq" className="animate-on-scroll">
      <Background>
        <StarField>{stars}</StarField>
      </Background>
      <FAQContainer>
        <Title
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-white text-center w-full font-bold font-main"
        >
          Frequently Asked Questions
        </Title>
        {faqData.map((faq, index) => (
          <FAQItem
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
          >
            <FAQQuestion onClick={() => toggleFAQ(index)}>
              <span className="font-game text-xs">{faq.question}</span>
              <span>{activeIndex === index ? "−" : "+"}</span>
            </FAQQuestion>
            <FAQAnswer
              animate={{
                height: activeIndex === index ? "auto" : 0,
                opacity: activeIndex === index ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              <p className="font-game text-xs pb-4">{faq.answer}</p>
            </FAQAnswer>
          </FAQItem>
        ))}
      </FAQContainer>
    </FAQSection>
  );
}

export default FAQ;
