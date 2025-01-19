import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import logo2 from "../../assets/images/common/logo2.png";

const FooterSection = styled.footer`
    min-height: 40vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(5, 46, 22);
    position: relative;
    overflow: hidden;
    margin-top: -2px;
    padding: 4rem 0;
`;

const Background = styled(motion.div)`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    z-index: 1;
    background: linear-gradient(120deg, rgba(5, 46, 22, 0.95) 0%, rgba(5, 46, 22, 0.98) 100%);
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
    width: ${props => props.size || '12px'};
    height: ${props => props.size || '12px'};
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
    opacity: ${props => props.brightness || 0.8};
    box-shadow: 0 0 ${props => props.glow || '8px'} rgba(74, 222, 128, 0.4);
`;

const Content = styled(motion.div)`
    position: relative;
    z-index: 2;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 3rem;
    margin-bottom: 3rem;
`;

const Column = styled(motion.div)`
    color: white;
`;

const Logo = styled(motion.img)`
    height: 40px;
    margin-bottom: 1rem;
`;

const Title = styled(motion.h3)`
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1.5rem;
    color: #4ade80;
`;

const Text = styled(motion.p)`
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.6;
    margin-bottom: 1rem;
`;

const NavList = styled.ul`
    list-style: none;
    padding: 0;
`;

const NavItem = styled(motion.li)`
    margin-bottom: 0.75rem;
`;

const StyledScrollLink = styled(ScrollLink)`
    color: rgba(255, 255, 255, 0.8);
    text-decoration: none;
    transition: color 0.3s ease;
    cursor: pointer;
    display: inline-block;

    &:hover {
        color: #4ade80;
    }
`;

const SocialLinks = styled(motion.div)`
    display: flex;
    gap: 1.5rem;
    margin-top: 1rem;
`;

const SocialLink = styled(motion.a)`
    color: rgba(255, 255, 255, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    transition: color 0.3s ease;
    background: rgba(255, 255, 255, 0.1);
    padding: 0.75rem;
    border-radius: 50%;

    svg {
        width: 24px;
        height: 24px;
    }

    &:hover {
        color: #4ade80;
        background: rgba(74, 222, 128, 0.1);
    }
`;

const Copyright = styled(motion.div)`
    text-align: center;
    color: rgba(255, 255, 255, 0.6);
    padding-top: 2rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const Footer = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 10
            }
        }
    };

    const linkVariants = {
        hover: {
            scale: 1.05,
            x: 10,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 10
            }
        },
        tap: { scale: 0.95 }
    };

    const socialVariants = {
        hover: {
            scale: 1.2,
            rotate: 15,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 10
            }
        },
        tap: { scale: 0.8 }
    };

    // Generate stars for the background
    const stars = Array.from({ length: 80 }, (_, i) => {
        const size = Math.random() * 12 + 8 + 'px';
        const left = Math.random() * 100 + '%';
        const top = Math.random() * 100 + '%';
        const brightness = Math.random() * 0.6 + 0.4;
        const glow = Math.random() * 12 + 6 + 'px';
        
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
                    y: top
                }}
                animate={{ 
                    opacity: brightness,
                    scale: [1, 1.3, 1],
                    rotate: [0, 180, 0],
                    transition: {
                        opacity: {
                            duration: 0.5,
                            delay: i * 0.02
                        },
                        scale: {
                            repeat: Infinity,
                            duration: 2.5 + Math.random() * 2,
                            ease: "easeInOut"
                        },
                        rotate: {
                            repeat: Infinity,
                            duration: 5 + Math.random() * 3,
                            ease: "linear"
                        }
                    }
                }}
                style={{
                    position: 'absolute',
                    left,
                    top,
                    filter: `hue-rotate(${Math.random() * 30}deg)`
                }}
            />
        );
    });

    return (
        <FooterSection id="contact">
            <Background
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <StarField>{stars}</StarField>
            </Background>
            <Content
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                <Grid>
                    <Column 
                        className="hidden md:block"
                        variants={itemVariants}
                    >
                        <Logo 
                            src={logo2} 
                            alt="ConxQuest"
                            initial={{ rotate: -10, scale: 0.9 }}
                            animate={{ rotate: 0, scale: 1 }}
                            transition={{ type: "spring", stiffness: 200 }}
                            whileHover={{ scale: 1.05 }}
                        />
                        <Text className="font-game text-xs" variants={itemVariants}>
                            Embark on an educational adventure where fun meets learning. Navigate interactive maps, conquer challenges, and explore the fascinating world of the Constitution with ConxQuest!
                        </Text>
                    </Column>
                    <Column 
                        className="hidden md:block"
                        variants={itemVariants}
                    >
                        <Title className="font-main"variants={itemVariants}>Quick Links</Title>
                        <NavList>
                            {['about', 'features', 'how-to-play', 'faq'].map((item, index) => (
                                <NavItem
                                    key={item}
                                    variants={itemVariants}
                                    custom={index}
                                >
                                    <StyledScrollLink
                                        to={item}
                                        smooth={true}
                                        duration={500}
                                        as={motion.div}
                                        variants={linkVariants}
                                        whileHover="hover"
                                        whileTap="tap"
                                    >
                                        <span className='font-game text-xs'>{item.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</span>
                                    </StyledScrollLink>
                                </NavItem>
                            ))}
                        </NavList>
                    </Column>
                    <Column variants={itemVariants}>
                        <Title className="font-main" variants={itemVariants}>Connect With Developer</Title>
                        <Text className="font-game text-xs" variants={itemVariants}>
                            Have ideas to contribute or feedback to share? Feel free to connect with me—I'd love to collaborate and make ConxQuest even better together!
                        </Text>
                        <SocialLinks
                            variants={itemVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {[
                                { icon: <Linkedin />, href: "https://www.linkedin.com/in/sabicka/" },
                                { icon: <Mail />, href: "mailto:connectwithsabick@gmail.com" },
                                { icon: <Twitter />, href: "https://twitter.com/Sabick_A" }
                            ].map((social, index) => (
                                <SocialLink
                                    key={index}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    variants={socialVariants}
                                    whileHover="hover"
                                    whileTap="tap"
                                >
                                    {social.icon}
                                </SocialLink>
                            ))}
                        </SocialLinks>
                    </Column>
                </Grid>
                <Copyright
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                >
                    <Text
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                    >
                      <span className='font-main '> &copy; {new Date().getFullYear()}  ConxQuest. All rights reserved.</span> 
                    </Text>
                </Copyright>
            </Content>
        </FooterSection>
    );
};

export default Footer;
