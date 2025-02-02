import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

const FAQSection = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(5, 46, 22);
  position: relative;
  overflow: hidden;
  margin-top: -2px;g
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
  clip-path: ${(props) => {
    switch(props.shape) {
      case 'triangle':
        return 'polygon(50% 0%, 0% 100%, 100% 100%)';
      case 'diamond':
        return 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)';
      case 'hexagon':
        return 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)';
      default:
        return `polygon(
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
        )`;
    }
  }};
  background: ${(props) => 
    props.gradient ? 
    `linear-gradient(135deg, ${props.gradient.start} 0%, ${props.gradient.end} 100%)` :
    'linear-gradient(135deg, #4ade80 0%, #14532d 100%)'
  };
  opacity: ${(props) => props.brightness || 0.8};
  box-shadow: 0 0 ${(props) => props.glow || "8px"} ${(props) => props.glowColor || "rgba(74, 222, 128, 0.4)"};
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
  transform-origin: top;
  will-change: height, opacity;
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

  const shapes = useMemo(() => {
    const elements = [];
    // Stars (60)
    for (let i = 0; i < 60; i++) {
      const size = Math.floor(Math.random() * 12 + 8) + "px";
      const left = Math.floor(Math.random() * 100) + "%";
      const top = Math.floor(Math.random() * 100) + "%";
      const brightness = (Math.floor(Math.random() * 6) + 4) / 10;
      const glow = Math.floor(Math.random() * 12 + 6) + "px";
      const rotationDuration = 3 + Math.floor(i / 10) * 2;
      const scaleDuration = 2 + Math.floor(i / 8) * 1.5;

      elements.push(
        <Star
          key={`star-${i}`}
          size={size}
          brightness={brightness}
          glow={glow}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: brightness,
            scale: [1, 1.2, 1],
            rotate: [0, 180, 0],
          }}
          transition={{
            opacity: { duration: 0.3, delay: i * 0.02 },
            scale: {
              repeat: Infinity,
              duration: scaleDuration,
              ease: "easeInOut",
            },
            rotate: {
              repeat: Infinity,
              duration: rotationDuration,
              ease: "linear",
            },
          }}
          style={{
            position: "absolute",
            left,
            top,
            filter: `hue-rotate(${Math.floor(Math.random() * 30)}deg)`,
          }}
        />
      );
    }

    // Additional shapes (30)
    const shapes = ['triangle', 'diamond', 'hexagon'];
    const gradients = [
      { start: '#4ade80', end: '#14532d' },
      { start: '#22c55e', end: '#15803d' },
      { start: '#86efac', end: '#166534' }
    ];

    for (let i = 0; i < 30; i++) {
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      const gradient = gradients[Math.floor(Math.random() * gradients.length)];
      const size = Math.floor(Math.random() * 16 + 10) + "px";
      const left = Math.floor(Math.random() * 100) + "%";
      const top = Math.floor(Math.random() * 100) + "%";
      const brightness = (Math.floor(Math.random() * 4) + 2) / 10;
      const glow = Math.floor(Math.random() * 15 + 8) + "px";
      const rotationDuration = 4 + Math.floor(i / 8) * 2;
      const scaleDuration = 3 + Math.floor(i / 6) * 1.5;

      elements.push(
        <Star
          key={`shape-${i}`}
          shape={shape}
          size={size}
          brightness={brightness}
          glow={glow}
          gradient={gradient}
          glowColor={`rgba(${shape === 'triangle' ? '134, 239, 172' : '74, 222, 128'}, 0.4)`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: brightness,
            scale: [1, 1.3, 1],
            rotate: [0, 360, 0],
          }}
          transition={{
            opacity: { duration: 0.4, delay: i * 0.03 },
            scale: {
              repeat: Infinity,
              duration: scaleDuration,
              ease: "easeInOut",
            },
            rotate: {
              repeat: Infinity,
              duration: rotationDuration,
              ease: "linear",
            },
          }}
          style={{
            position: "absolute",
            left,
            top,
            filter: `hue-rotate(${Math.floor(Math.random() * 45)}deg)`,
          }}
        />
      );
    }

    return elements;
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    const section = document.getElementById("faq");
    if (section) {
      observer.observe(section);
      return () => observer.unobserve(section);
    }
  }, []);

  const answerVariants = {
    open: {
      height: "auto",
      opacity: 1,
      transition: {
        height: {
          type: "spring",
          stiffness: 300,
          damping: 30,
        },
        opacity: { duration: 0.2 },
      },
    },
    closed: {
      height: 0,
      opacity: 0,
      transition: {
        height: {
          type: "spring",
          stiffness: 300,
          damping: 30,
        },
        opacity: { duration: 0.2 },
      },
    },
  };

  return (
    <FAQSection id="faq" className="animate-on-scroll">
      <Background>
        <StarField>{shapes}</StarField>
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
        <AnimatePresence mode="wait">
          {faqData.map((faq, index) => (
            <FAQItem
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <FAQQuestion onClick={() => toggleFAQ(index)}>
                <span className="font-game text-xs">{faq.question}</span>
                <span>{activeIndex === index ? "−" : "+"}</span>
              </FAQQuestion>
              <FAQAnswer
                initial="closed"
                animate={activeIndex === index ? "open" : "closed"}
                variants={answerVariants}
              >
                <p className="font-game text-xs pb-4">{faq.answer}</p>
              </FAQAnswer>
            </FAQItem>
          ))}
        </AnimatePresence>
      </FAQContainer>
    </FAQSection>
  );
}

export default React.memo(FAQ);
