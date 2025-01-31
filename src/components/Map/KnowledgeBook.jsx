import React, { useState, useEffect } from "react";
import KeyBind from "../common/KeyBind";
import styled from "styled-components";
import {
  preambleTitleImage,
  fundamentalRightsTitleImage,
  fundamentalDutiesTitleImage,
  dspTitleImage,
  boy1Image,
  boy2Image,
  boy3Image,
  policeImage,
} from "../../assets/images/Map";


const topics = [
    {
      id: 1,
      title: "The Preamble",
      titleImage: preambleTitleImage,
      character: boy1Image,
      coverImage: "/assets/images/Map/covers/preamble.jpg",
      content: [
        {
          title: "Preamble - Core Values",
          points: [
            {
              title: "Sovereign Nation",
              description: "India is free and independent, making its own laws without interference from other countries. This means India governs itself and no other country controls its decisions."
            },
            {
              title: "Socialist Values",
              description: "The government ensures that wealth is shared fairly among citizens. Everyone should have equal access to resources and opportunities."
            },
            {
              title: "Secular Nation",
              description: "All religions are treated equally without any bias. No religion is given special treatment, and everyone is free to practice their faith."
            }
          ]
        },
        {
          title: "Preamble - Democratic Principles",
          points: [
            {
              title: "Democratic System",
              description: "Leaders are elected by the people, and citizens have the power to vote. This means people choose who represents them in the government."
            },
            {
              title: "Justice, Liberty, Equality",
              description: "The Constitution guarantees fairness, freedom, and equal rights for everyone. Everyone is treated equally, has the freedom to express themselves, and has access to fair opportunities."
            }
          ]
        }
      ]
    },
    {
      id: 2,
      title: "Fundamental Rights for Citizens",
      titleImage: fundamentalRightsTitleImage,
      character: boy2Image,
      coverImage: "/assets/images/Map/covers/rights.jpg",
      content: [
        {
          title: "Fundamental Rights - Part 1",
          points: [
            {
              title: "Equality Before Law",
              description: "Everyone is treated the same under the law, regardless of their background. No one gets special treatment, and all people are equal in the eyes of the law."
            },
            {
              title: "No Discrimination",
              description: "You cannot be treated unfairly based on your religion, race, gender, or birthplace. It means everyone should be treated the same, regardless of who they are."
            },
            {
              title: "Freedom of Speech",
              description: "You have the right to express your opinions freely. This allows you to speak your mind, as long as it doesn't harm others."
            }
          ]
        },
        {
          title: "Fundamental Rights - Part 2",
          points: [
            {
              title: "Right to Assemble",
              description: "Citizens can gather peacefully in groups. You can meet with others to discuss issues or hold peaceful protests."
            },
            {
              title: "Freedom of Movement",
              description: "You are free to travel and live anywhere in India. You can move to different places without restrictions."
            },
            {
              title: "Right to Education",
              description: "Every child between the ages of 6 and 14 must receive free education. This ensures that all children have the chance to go to school and learn."
            }
          ]
        },
        {
          title: "Fundamental Rights - Part 3",
          points: [
            {
              title: "Right to Life",
              description: "You cannot be harmed or deprived of your personal freedom unless allowed by law. Everyone has the right to live safely and make personal choices."
            },
            {
              title: "Protection Against Arrest",
              description: "If arrested, you must be informed of the reason and have access to a lawyer. This makes sure you're treated fairly if the police detain you."
            },
            {
              title: "Protection from Forced Labor",
              description: "You cannot be forced to work without your will or for no pay. No one can make you work in conditions you don't agree to."
            }
          ]
        },
        {
          title: "Fundamental Rights - Part 4",
          points: [
            {
              title: "Prohibition of Child Labor",
              description: "Children under 14 cannot work in hazardous jobs like factories or mines. This protects kids from harmful jobs and ensures they can go to school."
            },
            {
              title: "Freedom of Religion",
              description: "You can follow and practice any religion you believe in. You have the right to choose and follow your faith without pressure."
            },
            {
              title: "Cultural Rights",
              description: "Communities can preserve their language and culture. This allows people to keep their traditions and pass them on to future generations."
            }
          ]
        },
        {
          title: "Fundamental Rights - Part 5",
          points: [
            {
              title: "Right to Property",
              description: "Though this is no longer a fundamental right, citizens can own property. You can buy, sell, or keep land and belongings."
            },
            {
              title: "Right to Privacy",
              description: "Your personal information cannot be disclosed without your consent. This protects your private life from being exposed without your permission."
            },
            {
              title: "Right Against Exploitation",
              description: "You cannot be trafficked or subjected to slavery or unfair treatment. No one can take advantage of you or force you into harmful situations."
            }
          ]
        },
        {
          title: "Fundamental Rights - Part 6",
          points: [
            {
              title: "Right to Constitutional Remedies",
              description: "You can go to court if your rights are violated. If someone takes away your rights, you can ask the court to help you."
            },
            {
              title: "Freedom of Profession",
              description: "You can choose any profession or business. You have the freedom to decide what job or career you want to pursue."
            },
            {
              title: "Right to Information",
              description: "You can request information about government activities. This allows you to stay informed about what the government is doing."
            }
          ]
        },
        {
          title: "Fundamental Rights - Part 7",
          points: [
            {
              title: "No Double Punishment",
              description: "You cannot be punished twice for the same crime. Once you've been judged, you can't be tried again for the same thing."
            },
            {
              title: "No Self-incrimination",
              description: "You cannot be forced to testify against yourself in a crime. The law protects you from being made to admit guilt."
            }
          ]
        }
      ]
    },
    {
      id: 3,
      title: "Fundamental Duties of Indian Citizens",
      titleImage: fundamentalDutiesTitleImage,
      character: boy3Image,
      coverImage: "/assets/images/Map/covers/duties.jpg",
      content: [
        {
          title: "Fundamental Duties - Part 1",
          points: [
            {
              title: "Respect the Constitution",
              description: "Follow and honour the principles of the Constitution. It means knowing the rules that guide the country and following them."
            },
            {
              title: "Respect National Symbols",
              description: "Show respect for the National Flag and National Anthem. Stand up during the anthem and treat the flag with care."
            },
            {
              title: "Defend the Country",
              description: "Be ready to protect and serve the country when needed. If called upon, you should help in national defence or emergencies."
            }
          ]
        },
        {
          title: "Fundamental Duties - Part 2",
          points: [
            {
              title: "Promote Harmony",
              description: "Spread peace and unity among people, regardless of their religion, language, or region. Help bring people together and avoid causing fights."
            },
            {
              title: "Value Heritage",
              description: "Take pride in and preserve India's rich cultural heritage. Learn about the country's history and pass it on to the next generation."
            },
            {
              title: "Protect Nature",
              description: "Help protect the environment, forests, rivers, and wildlife. Don't harm nature and take steps to care for the world around you."
            }
          ]
        },
        {
          title: "Fundamental Duties - Part 3",
          points: [
            {
              title: "Develop Scientific Temper",
              description: "Be curious, think scientifically, and encourage progress. Use logic and knowledge to solve problems and improve society."
            },
            {
              title: "Safeguard Public Property",
              description: "Take care of and respect public resources and infrastructure. Don't damage things that belong to everyone, like parks and roads."
            },
            {
              title: "Promote Non-violence",
              description: "Avoid violence and seek peaceful resolutions to conflicts. Solve problems by talking instead of fighting."
            }
          ]
        },
        {
          title: "Fundamental Duties - Part 4",
          points: [
            {
              title: "Work for Excellence",
              description: "Strive to do your best in everything to help the country progress. Always aim to improve and be the best at what you do."
            },
            {
              title: "Education Duty",
              description: "Parents must ensure their children aged 6 to 14 receive an education. This helps kids get the knowledge they need for a better future."
            },
            {
              title: "Cherish Freedom",
              description: "Appreciate and uphold the ideals that were fought for during India's struggle for independence. Value the sacrifices made for the country's freedom."
            }
          ]
        },
        {
          title: "Fundamental Duties - Part 5",
          points: [
            {
              title: "Uphold Sovereignty",
              description: "Support and maintain India's sovereignty and integrity. Ensure India stays united and independent."
            },
            {
              title: "Help in National Emergencies",
              description: "Contribute to national service in times of emergencies or disasters. Volunteer to help others when the country faces problems."
            },
            {
              title: "Respect Women",
              description: "Help ensure dignity, safety, and equality for women. Treat women fairly and support gender equality."
            }
          ]
        },
        {
          title: "Fundamental Duties - Part 6",
          points: [
            {
              title: "Fight Corruption",
              description: "Avoid bribery and work to create a clean and just society. Do your part to stop cheating and dishonesty."
            },
            {
              title: "Support National Development",
              description: "Actively participate in initiatives that boost the nation's growth. Get involved in activities that make the country better."
            },
            {
              title: "Be Informed Citizens",
              description: "Stay aware of the country's laws and duties to actively participate in democracy. Understand your rights and responsibilities as a citizen."
            }
          ]
        },
        {
          title: "Fundamental Duties - Part 7",
          points: [
            {
              title: "Respect Laws",
              description: "Abide by all laws and pay taxes fairly. Follow the rules that help keep society organized and safe."
            },
            {
              title: "Encourage Civic Virtues",
              description: "Be courteous, responsible, and active in contributing to your community. Help others and participate in your local area's activities."
            }
          ]
        }
      ]
    },
    {
        id: 4,

        titleImage: dspTitleImage,
        character: policeImage,
        coverImage: "/assets/images/Map/covers/dsp.jpg",
        content: [
          {
            title: "Economic Principles - Part 1",
            points: [
              {
                title: "Adequate Livelihood",
                description: "The state should ensure that all citizens have adequate means of livelihood and equal pay for equal work, regardless of gender."
              },
              {
                title: "Economic Resources",
                description: "The state should work to distribute material resources fairly to serve the common good and prevent wealth concentration."
              },
              {
                title: "Economic Inequality",
                description: "The state shall work to minimize inequalities in income and eliminate inequalities in status, facilities, and opportunities among individuals and groups."
              }
            ]
          },
          {
            title: "Social Justice - Part 1",
            points: [
              {
                title: "Worker Rights",
                description: "The state should ensure fair and humane working conditions, maternity relief, and living wages for all workers, both industrial and agricultural."
              },
              {
                title: "Child Protection",
                description: "Children should be given opportunities to develop in healthy conditions, with freedom and dignity, protected from exploitation and moral abandonment."
              },
              {
                title: "Weaker Sections",
                description: "The state shall promote educational and economic interests of weaker sections, particularly SC/STs, and protect them from social injustice."
              }
            ]
          },
          {
            title: "Social Justice - Part 2",
            points: [
              {
                title: "Public Health",
                description: "The state should raise the level of nutrition and standard of living, and improve public health by prohibiting intoxicating drinks and drugs harmful to health."
              },
              {
                title: "Environment Protection",
                description: "The state shall endeavor to protect and improve the environment and safeguard forests and wildlife of the country."
              },
              {
                title: "Historical Preservation",
                description: "The state should protect monuments, places and objects of national importance, and preserve the rich heritage of composite culture."
              }
            ]
          },
          {
            title: "Governance - Part 1",
            points: [
              {
                title: "Village Panchayats",
                description: "The state shall work to organize village panchayats and enable them to function as units of self-government for effective local administration."
              },
              {
                title: "Right to Work",
                description: "The state shall endeavor to secure the right to work, education, and public assistance in cases of unemployment, old age, sickness, and disability."
              },
              {
                title: "Uniform Civil Code",
                description: "The state shall endeavor to secure a uniform civil code throughout the territory of India to ensure equal rights in personal matters."
              }
            ]
          },
          {
            title: "International Relations",
            points: [
              {
                title: "International Peace",
                description: "The state shall promote international peace and security, maintain just and honorable relations between nations, and foster respect for international law."
              },
              {
                title: "Treaty Obligations",
                description: "The state shall endeavor to maintain respect for international law and treaty obligations in dealings with organized peoples."
              },
              {
                title: "Dispute Resolution",
                description: "The state shall encourage settlement of international disputes by arbitration to promote peaceful coexistence with other nations."
              }
            ]
          },
          {
            title: "Legal and Social Framework",
            points: [
              {
                title: "Free Legal Aid",
                description: "The state shall provide free legal aid to ensure that opportunities for justice are not denied to any citizen due to economic or other disabilities."
              },
              {
                title: "Industrial Participation",
                description: "The state shall take steps to secure the participation of workers in the management of industries to promote industrial harmony."
              },
              {
                title: "Agriculture and Animal Husbandry",
                description: "The state shall endeavor to organize agriculture and animal husbandry on modern and scientific lines for economic progress."
              }
            ]
          }
        ]
      }
  ];

// Styled Components
const CardsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 40px;
  margin-top: 4rem;
  perspective: 2500px;
  width: 100%;
  min-height: 450px;
  padding: 0 20px;
`;

const CardContainer = styled.div`
  width: 240px;
  height: 400px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding: 0 36px;
  perspective: 2500px;
  transition: all 0.3s ease;
  transform: ${props => props.isActive ? 'scale(1.1)' : 'scale(1)'};
  z-index: ${props => props.isActive ? '10' : '1'};
`;

const Wrapper = styled.div`
  transition: all 0.5s;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -1;
  border-radius: 15px;
  background: whitesmoke;
  border: 4px solid rgba(34, 197, 94, 0.3);
  overflow: hidden;

  ${CardContainer}[data-active="true"] & {
    transform: perspective(900px) translateY(-5%) rotateX(25deg) translateZ(0);
    box-shadow: 2px 35px 32px -8px rgba(0, 0, 0, 0.75);
  }

  &::before,
  &::after {
    content: "";
    opacity: 0;
    width: 100%;
    height: 80px;
    transition: all 0.5s;
    position: absolute;
    left: 0;
  }

  &::before {
    top: 0;
    height: 100%;
    background-image: linear-gradient(
      to top,
      transparent 46%,
      rgba(12, 13, 19, 0.5) 68%,
      rgba(12, 13, 19) 0.97
    );
  }

  &::after {
    bottom: 0;
    opacity: 1;
    background-image: linear-gradient(
      to bottom,
      transparent 46%,
      rgba(12, 13, 19, 0.5) 68%,
      rgba(12, 13, 19) 0.97
    );
  }

  ${CardContainer}[data-active="true"] &::before,
  ${CardContainer}[data-active="true"] &::after {
    opacity: 1;
  }

  ${CardContainer}[data-active="true"] &::after {
    height: 120px;
  }
`;

const TitleImage = styled.img`
  width: 100%;
  transition: transform 0.5s;
  position: relative;
  z-index: 2;

  ${CardContainer}[data-active="true"] & {
    transform: translate3d(0%, -50px, 100px);
  }
`;

const CharacterImage = styled.img`
  width: 100%;
  opacity: 0;
  transition: all 0.5s;
  position: absolute;
  z-index: 1;

  ${CardContainer}[data-active="true"] & {
    opacity: 1;
    transform: translate3d(0%, -30%, 100px);
  }
`;

const Card = ({ title, titleImage, character, coverImage, onClick, isActive }) => (
  <CardContainer onClick={onClick} isActive={isActive} data-active={isActive}>
    <Wrapper>
      {isActive && (
        <>
          <div className="absolute -top-2 -left-2 w-4 h-4 animate-pulse-green">
            <div className="absolute inset-0 bg-green-500 rounded-full animate-ping" />
            <div className="absolute inset-0 bg-green-400 rounded-full" />
          </div>
          <div className="absolute -bottom-2 -right-2 w-4 h-4 animate-pulse-green">
            <div className="absolute inset-0 bg-green-500 rounded-full animate-ping" />
            <div className="absolute inset-0 bg-green-400 rounded-full" />
          </div>
        </>
      )}
    </Wrapper>
    <TitleImage src={titleImage.src} alt={title} className="pixelated" />
    <CharacterImage src={character.src} alt="character" className="pixelated" />
  </CardContainer>
);

// Add these styles to your CSS
const style = document.createElement('style');
style.textContent = `
  @keyframes character-float {
    0%, 100% {
      transform: translateY(0) scale(1);
    }
    50% {
      transform: translateY(-10px) scale(1.05);
    }
  }

  @keyframes pulse-green {
    0%, 100% {
      opacity: 1;
      transform: scale(1);
    }
    50% {
      opacity: 0.5;
      transform: scale(1.2);
    }
  }

  .animate-character-float {
    animation: character-float 3s ease-in-out infinite;
  }

  .animate-pulse-green {
    animation: pulse-green 2s ease-in-out infinite;
  }

  .pixelated {
    image-rendering: pixelated;
    image-rendering: -moz-crisp-edges;
    image-rendering: crisp-edges;
  }
`;
document.head.appendChild(style);

const ContentView = ({ content, onBack, currentPage, totalPages, onNext, onPrev }) => (
  <div className="w-[1200px] max-w-[95vw] max-h-[95vh] flex flex-col p-8 bg-whitesmoke rounded-3xl border-2 border-green-700 shadow-[0_0_15px_rgba(34,197,94,0.3)]">
    {/* Header with Menu Key */}
    <div className="flex justify-between items-center mb-8">
      <div className="flex items-center gap-2 text-green-700">
        <span className="font-game text-lg">Menu:</span>
        <KeyBind>M</KeyBind>
      </div>
      <div className="w-[100px]"></div> {/* Spacer for alignment */}
      <div className="w-[100px]"></div> {/* Spacer for alignment */}
    </div>
    
    <h1 className="text-cxl font-game text-green-700 mb-8 text-center tracking-wider">{content.title}</h1>
    
    <div className="flex-grow overflow-auto custom-scrollbar">
      <ul className="space-y-8 px-8">
        {content.points.map((point, index) => (
          <li key={index} className="text-left bg-green-700/5 p-6 rounded-lg border border-green-700/30">
            <h3 className="font-game text-xl text-green-700 mb-2">{point.title}</h3>
            <p className="font-main text-gray-700 leading-relaxed">{point.description}</p>
          </li>
        ))}
      </ul>
    </div>

    {/* Navigation Footer */}
    <div className="flex justify-between items-center p-8 mt-4 border-t-2 border-green-700/30">
      {/* Previous Button */}
      <div className="w-[200px] flex items-center gap-2 text-green-700">
        {currentPage > 0 && (
          <>
            <span className="font-game">Previous:</span>
            <KeyBind>←</KeyBind>
          </>
        )}
      </div>

      {/* Close Button - Always Centered */}
      <div className="flex items-center gap-2 text-green-700">
        <span className="font-game">Close:</span>
        <KeyBind>Q</KeyBind>
      </div>

      {/* Next Button */}
      <div className="w-[200px] flex items-center gap-2 text-green-700 justify-end">
        {currentPage < totalPages - 1 && (
          <>
            <span className="font-game">Next:</span>
            <KeyBind>→</KeyBind>
          </>
        )}
      </div>
    </div>
  </div>
);

const KnowledgeBookContainer = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  backdrop-filter: blur(8px);
`;

const ContentContainer = styled.div`
  width: 1400px;
  max-width: 95vw;
  max-height: 95vh;
  background: whitesmoke;
  opacity :0.9;
  padding: 2rem;
  border-radius: 1.5rem;
  border: 2px solid rgb(34 197 94);
  box-shadow: 0 0 15px rgba(34, 197, 94, 0.3);
  display: flex;
  flex-direction: column;
`;

const KnowledgeBook = ({ onClose }) => {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [activeCardIndex, setActiveCardIndex] = useState(0);


  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key.toLowerCase() === 'q') {
        onClose();
      } else if (e.key === 'ArrowRight' && !selectedTopic) {
        setActiveCardIndex((prev) => Math.min(prev + 1, topics.length - 1));
      } else if (e.key === 'ArrowLeft' && !selectedTopic) {
        setActiveCardIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter' && !selectedTopic) {
        setSelectedTopic(topics[activeCardIndex]);
      } else if (e.key === 'ArrowRight' && selectedTopic) {
        if (currentPage < selectedTopic.content?.length - 1) {
          setCurrentPage(prev => prev + 1);
        }
      } else if (e.key === 'ArrowLeft' && selectedTopic) {
        if (currentPage > 0) {
          setCurrentPage(prev => prev - 1);
        }
      } else if (e.key.toLowerCase() === 'm' && selectedTopic) {
        setSelectedTopic(null);
        setCurrentPage(0);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onClose, selectedTopic, activeCardIndex, currentPage]);

  if (!selectedTopic) {
    return (
      <KnowledgeBookContainer>
        <ContentContainer>
          <h1 className="text-3xl font-game text-green-700 mt-8 tracking-wider text-center">
            Happy Learning!
          </h1>
          <h3 className="text-xl font-main text-gray-700 mt-8 mb-8 text-center">
            Select the Title You Want to Explore
          </h3>
          
          <CardsContainer>
            {topics.map((topic, index) => (
              <Card
                key={topic.id}
                {...topic}
                isActive={index === activeCardIndex}
                onClick={() => {
                  setSelectedTopic(topic);
                  setCurrentPage(0);
                }}
              />
            ))}
          </CardsContainer>
          
          <div className="mt-16 flex justify-center items-center gap-12">
            <div className="flex items-center gap-2 text-green-700">
              <span className="font-game">Navigate:</span>
              <KeyBind>←</KeyBind>
              <KeyBind>→</KeyBind>
            </div>
            <div className="flex items-center gap-2 text-green-700">
              <span className="font-game">Select:</span>
              <KeyBind>Enter</KeyBind>
            </div>
            <div className="flex items-center gap-2 text-green-700">
              <span className="font-game">Close:</span>
              <KeyBind>Q</KeyBind>
            </div>
          </div>
        </ContentContainer>
      </KnowledgeBookContainer>
    );
  }

  return (
    <KnowledgeBookContainer>
      {selectedTopic.content && selectedTopic.content[currentPage] && (
        <ContentContainer>
          {/* Header with Menu Key */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-2 text-green-700">
              <span className="font-game text-lg">Menu:</span>
              <KeyBind>M</KeyBind>
            </div>
            <div className="w-[100px]"></div>
            <div className="w-[100px]"></div>
          </div>
          
          <h1 className="text-3xl font-game text-green-700 mb-8 text-center tracking-wider">
            {selectedTopic.content[currentPage].title}
          </h1>
          
          <div className="flex-grow overflow-auto custom-scrollbar h-[500px]">
            <ul className="space-y-8 px-8">
              {selectedTopic.content[currentPage].points.map((point, index) => (
                <li key={index} className="text-left bg-green-700/5 p-6 rounded-lg border border-green-700/30">
                  <h3 className="font-game text-lg text-green-700 mb-2">{point.title}</h3>
                  <p className="font-main text-gray-700 leading-relaxed">{point.description}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation Footer */}
          <div className="flex justify-between items-center p-8 mt-4 border-t-2 border-green-700/30">
            {/* Previous Button */}
            <div className="w-[200px] flex items-center gap-2 text-green-700">
              {currentPage > 0 && (
                <>
                  <span className="font-game">Previous:</span>
                  <KeyBind>←</KeyBind>
                </>
              )}
            </div>

            {/* Close Button - Always Centered */}
            <div className="flex items-center gap-2 text-green-700">
              <span className="font-game">Close:</span>
              <KeyBind>Q</KeyBind>
            </div>

            {/* Next Button */}
            <div className="w-[200px] flex items-center gap-2 text-green-700 justify-end">
              {currentPage < selectedTopic.content.length - 1 && (
                <>
                  <span className="font-game">Next:</span>
                  <KeyBind>→</KeyBind>
                </>
              )}
            </div>
          </div>
        </ContentContainer>
      )}
    </KnowledgeBookContainer>
  );
};

export default KnowledgeBook; 
