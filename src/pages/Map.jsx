import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import {
  initSprites,
  initiVectors,
  updateGameLogic,
  checkXButtonStatus,
  drawElements
} from "../utils/Map";
import { useKeyboard } from "../hooks/useKeyboard";
import Loader from "../components/Map/Loader/Loader";
import InitialLoader from "../components/common/InitialLoader";
import XBtn from "../components/Map/XBtn";
import Navbar from "../components/Map/Navbar";
import Controls from "../components/Map/Controls";
import MapView from "../components/Map/MapView";
import Guide from "../components/Map/Guide";
import KnowledgeBook from "../components/Map/KnowledgeBook";
import Dialog from "../components/Map/Dialog";
import ProgressNotification from "../components/Map/ProgressNotification";
import { useNavigate, useLocation } from 'react-router-dom';

function Canvas() {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const [xButton, setXButton] = useState(false);
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [minLoadingComplete, setMinLoadingComplete] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [showMap, setShowMap] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [showKnowledgeBook, setShowKnowledgeBook] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [currentNpcId, setCurrentNpcId] = useState(null);
  const [navigating, setNavigating] = useState(false);
  const [isReturningFromGame, setIsReturningFromGame] = useState(false);
  const [showProgressNotification, setShowProgressNotification] = useState(false);
  const [progressValues, setProgressValues] = useState({ start: 0, end: 0 });
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const gameStateRef = useRef(null);

  const { keys, lastKey, handleKeyDown, handleKeyUp, animationIdRef } =
    useKeyboard();

  const animate = useCallback((state) => {
    if (!state || !state.isAnimating || !contextRef.current || !canvasRef.current) return;

    const currentTime = performance.now();
    const deltaTime = (currentTime - (state.lastTime || currentTime)) / 1000; // Convert to seconds
    state.lastTime = currentTime;

    contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    
    const movables = [
      state.background,
      ...state.boundaries,
      state.foreground,
      ...state.teleports,
      ...state.interacts,
    ];

    const teleportActivated = updateGameLogic(
      contextRef.current,
      state.player,
      state.background,
      state.foreground,
      state.boundaries,
      state.teleports,
      state.interacts,
      keys.current,
      lastKey.current,
      movables,
      deltaTime
    );

    if (!teleportActivated && state.isAnimating) {
      animationIdRef.current = window.requestAnimationFrame(() => animate(state));
    }

    // Throttle UI updates to reduce React state updates
    const now = Date.now();
    if (!state.lastUIUpdate || now - state.lastUIUpdate >= 50) { // Update UI at most every 50ms
      const xButtonActivated = checkXButtonStatus(
        state.player,
        state.teleports,
        state.interacts
      );
      setXButton(xButtonActivated);
      setPlayerPosition({
        x: state.player.position.x + state.player.width / 2,
        y: state.player.position.y + state.player.height / 2,
      });
      state.lastUIUpdate = now;
    }
  }, []);

  const PauseAnimation = useCallback(() => {
    if (!contextRef.current || !canvasRef.current || !gameStateRef.current) return;
    
    gameStateRef.current.isAnimating = false;
    if (animationIdRef.current) {
      window.cancelAnimationFrame(animationIdRef.current);
      animationIdRef.current = null;
    }

    // Do one final render before stopping
    contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    if (gameStateRef.current.background && gameStateRef.current.player && gameStateRef.current.foreground) {
      drawElements(contextRef.current, [
        gameStateRef.current.background,
        gameStateRef.current.player,
        gameStateRef.current.foreground
      ]);
    }
  }, []);

  const ResumeAnimation = useCallback(() => {
    if (!gameStateRef.current || !contextRef.current || !canvasRef.current) return;
    
    if (!gameStateRef.current.isAnimating) {
      gameStateRef.current.isAnimating = true;
      if (animationIdRef.current) {
        window.cancelAnimationFrame(animationIdRef.current);
        animationIdRef.current = null;
      }
      animationIdRef.current = requestAnimationFrame(() => animate(gameStateRef.current));
    }
  }, [animate]);

  const handleKnowledgeBookClose = useCallback(() => {
    setShowKnowledgeBook(false);
    ResumeAnimation();
  }, [ResumeAnimation]);

  const handleKnowledgeBookOpen = useCallback(() => {
    setShowKnowledgeBook(true);
    PauseAnimation();
  }, [PauseAnimation]);

  const handleDialogClose = useCallback(() => {
    setShowDialog(false);
    setCurrentNpcId(null);
    ResumeAnimation();
  }, [ResumeAnimation]);

  const handleDialogOpen = useCallback((npcId) => {
    console.log('Opening dialog for NPC:', npcId);
    setCurrentNpcId(npcId);
    setShowDialog(true);
    PauseAnimation();
  }, [PauseAnimation]);

  useEffect(() => {
    // Set initial background color to dark green during loading
    document.body.style.backgroundColor = "rgb(5, 46, 22)";
    
    // Start fade in after a brief delay
    setTimeout(() => {
      setFadeIn(true);
    }, 100);

    // Change to blue only after loading is complete
    if (!loading && !fadeOut) {
      document.body.style.backgroundColor = "#2A7299";
    }

    // Cleanup: set back to dark green when unmounting
    return () => {
      document.body.style.backgroundColor = "rgb(5, 46, 22)";
    };
  }, [loading, fadeOut]);

  useEffect(() => {
    // Request full screen
    const requestFullScreen = async () => {
      try {
        const element = document.documentElement;
        if (element.requestFullscreen) {
          await element.requestFullscreen();
        } else if (element.mozRequestFullScreen) { // Firefox
          await element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) { // Chrome, Safari & Opera
          await element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) { // IE/Edge
          await element.msRequestFullscreen();
        }
      } catch (error) {
        console.log("Fullscreen request failed:", error);
      }
    };

    requestFullScreen();

    // Load Botpress scripts
    const injectScript = document.createElement("script");
    injectScript.src = "https://cdn.botpress.cloud/webchat/v2.1/inject.js";
    injectScript.id = "botpress-inject-script";

    const configScript = document.createElement("script");
    configScript.src =
      "https://mediafiles.botpress.cloud/fb82c3c2-66cb-4282-86a2-ddafece5c8eb/webchat/v2.1/config.js";
    configScript.id = "botpress-config-script";

    // Add scripts to head
    document.head.appendChild(injectScript);
    injectScript.onload = () => {
      document.head.appendChild(configScript);
    };

    // Add knowledge book event listener
    const handleKnowledgeBook = () => handleKnowledgeBookOpen();
    window.addEventListener('openKnowledgeBook', handleKnowledgeBook);

    // Add dialog event listener
    const handleDialog = (event) => {
      const { npcId } = event.detail;
      handleDialogOpen(npcId);
    };
    window.addEventListener('openDialog', handleDialog);

    // Cleanup function
    return () => {
      window.removeEventListener('openKnowledgeBook', handleKnowledgeBook);
      window.removeEventListener('openDialog', handleDialog);
      
      // Remove Botpress scripts
      const injectScriptElement = document.getElementById("botpress-inject-script");
      const configScriptElement = document.getElementById("botpress-config-script");

      if (injectScriptElement) injectScriptElement.remove();
      if (configScriptElement) configScriptElement.remove();

      // Clean up Botpress elements
      const botpressElements = document.querySelectorAll('[class*="bp"]');
      botpressElements.forEach((element) => element.remove());
    };
  }, [handleKnowledgeBookOpen, handleDialogOpen]);

  useEffect(() => {
    const canvas = canvasRef.current;
    contextRef.current = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Set minimum loading time of 2 seconds
    setTimeout(() => {
      setMinLoadingComplete(true);
    }, 1000);

    const offset = {
      x: -900 + (canvas.width - 1024) / 2,
      y: -2800 + (canvas.height - 576) / 2,
    };

    const { teleports, boundaries, interacts } = initiVectors(offset);
    const { background, player, foreground } = initSprites(canvas, offset);

    // Store game state
    gameStateRef.current = {
      isAnimating: true,
      player: player,
      background: background,
      foreground: foreground,
      boundaries: boundaries,
      teleports: teleports,
      interacts: interacts,
      offset: offset,
    };

    // Add load event listeners to all images
    const imagesToLoad = [background.image, player.image, foreground.image];
    let loadedImages = 0;

    const handleImageLoad = () => {
      loadedImages++;
      if (loadedImages === imagesToLoad.length) {
        setImagesLoaded(true);
      }
    };

    imagesToLoad.forEach((img) => {
      if (img.complete) {
        handleImageLoad();
      } else {
        img.addEventListener("load", handleImageLoad);
      }
      img.addEventListener(
        "load",
        () => {
          img.removeEventListener("load", handleImageLoad);
        },
        { once: true }
      );
    });

    // Add event listeners
    const keyDownHandler = (e) => handleKeyDown(e, (callback) => {
      setNavigating(true);
      callback();
    });
    window.addEventListener("keydown", keyDownHandler);
    window.addEventListener("keyup", handleKeyUp);

    // Setup Botpress webchat event listeners
    const setupBotpressListener = () => {
      if (window.botpress) {

        // Backup mechanism using MutationObserver to detect iframe state
        const observer = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            if (
              mutation.type === "attributes" &&
              mutation.attributeName === "class"
            ) {
              const iframe = mutation.target;
              const classes = iframe.className.split(" ");

              // Find the state class (one that starts with 'bp')
              const stateClass = classes.find((cls) => cls.startsWith("bp"));
              if (!stateClass) return;

              if (stateClass === "bpOpen") {
                PauseAnimation();
              } else if (stateClass === "bpClose") {
                ResumeAnimation();
              }
            }
          });
        });

        // Function to start observing the iframe once it's available
        const startObserving = () => {
          const iframe = document.querySelector('iframe[title="Botpress"]');
          if (iframe) {
            observer.observe(iframe, {
              attributes: true,
              attributeFilter: ["class"],
            });

            // Check initial state
            const initialClasses = iframe.className.split(" ");
            const initialState = initialClasses.find((cls) =>
              cls.startsWith("bp")
            );

            // Set initial game state based on bot state
            if (initialState === "bpOpen") {
              gameStateRef.current.isAnimating = false;
              if (animationIdRef.current) {
                window.cancelAnimationFrame(animationIdRef.current);
              }
            }
          } else {
            // If iframe is not available yet, retry after a short delay
            setTimeout(startObserving, 100);
          }
        };

        // Start observing
        startObserving();

        // Cleanup observer on component unmount
        return () => observer.disconnect();
      }
    };

    // Check if Botpress is already loaded
    if (window.botpress) {
      setupBotpressListener();
    } else {
      const botpressCheckInterval = setInterval(() => {
        if (window.botpress) {
          setupBotpressListener();
          clearInterval(botpressCheckInterval);
        }
      }, 100);
    }

    // Start initial animation
    if (gameStateRef.current) {
      gameStateRef.current.isAnimating = true;
      animate(gameStateRef.current);
    }

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("keydown", keyDownHandler);
      window.removeEventListener("keyup", handleKeyUp);
      if (animationIdRef.current) {
        window.cancelAnimationFrame(animationIdRef.current);
        animationIdRef.current = null;
      }
      window.removeEventListener("resize", handleResize);
    };
  }, [animate, handleKeyDown, handleKeyUp]);

  useEffect(() => {
    if (imagesLoaded && minLoadingComplete) {
      setFadeOut(true);
      // Wait for fadeout animation to complete before removing loader
      setTimeout(() => {
        setLoading(false);
        // Change background color to blue after loader is gone
        document.body.style.backgroundColor = "#2A7299";
      }, 500);
    }
  }, [imagesLoaded, minLoadingComplete]);

  useEffect(() => {
    const checkKeys = () => {
      if (keys.current.c.pressed) {
        keys.current.c.pressed = false;
        setShowControls(true);
      }
      if (keys.current.tab && keys.current.tab.pressed) {
        keys.current.tab.pressed = false;
        setShowMap(true);
      }
      if (keys.current.g && keys.current.g.pressed) {
        keys.current.g.pressed = false;
        setShowGuide(true);
      }
      requestAnimationFrame(checkKeys);
    };
    const animationId = requestAnimationFrame(checkKeys);
    return () => cancelAnimationFrame(animationId);
  }, [keys]);

  useEffect(() => {
    const handleInitialKeyPress = (e) => {
      setShowControls(false);
      // Remove the event listener after first key press
      window.removeEventListener("keydown", handleInitialKeyPress);
    };

    window.addEventListener("keydown", handleInitialKeyPress);
    return () => window.removeEventListener("keydown", handleInitialKeyPress);
  }, []);

  useEffect(() => {
    const handleGameStart = (event) => {
      const { type, gameState } = event.detail;
      
      // Save complete game state
      localStorage.setItem('lastGameState', JSON.stringify(gameState));
      
      // Navigate to appropriate game
      if (type === 1) {
        navigate('/games/cardgame', { 
          state: { 
            fromMap: true,
            gameState 
          }
        });
      }
    };

    // We don't need handleGameComplete anymore since ProgressBar handles it directly
    window.addEventListener('startGame', handleGameStart);

    return () => {
      window.removeEventListener('startGame', handleGameStart);
    };
  }, [navigate]);

  // Update the state restoration effect
  useEffect(() => {
    const restoreGameState = (gameState) => {
      if (gameStateRef.current) {
        // Restore player position
        if (gameState.playerPosition && gameStateRef.current.player) {
          gameStateRef.current.player.position = gameState.playerPosition;
        }

        // Restore all movable elements
        if (gameState.movablesPositions) {
          const movables = [
            gameStateRef.current.background,
            ...gameStateRef.current.boundaries,
            gameStateRef.current.foreground,
            ...gameStateRef.current.teleports,
            ...gameStateRef.current.interacts
          ];

          gameState.movablesPositions.forEach((pos, index) => {
            if (movables[index]) {
              movables[index].position.x = pos.x;
              movables[index].position.y = pos.y;
            }
          });
        }
      }
    };

    let timers = [];

    // Check if we're returning from a game
    if (location.state?.returnedFromGame) {
      setIsReturningFromGame(true);
      setShowControls(false); // Don't show controls when returning
      setLoading(true); // Show loading screen when returning
      setFadeOut(false);

      // After a short delay, start fade out and hide loader
      const fadeTimer = setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }, 1000);
      timers.push(fadeTimer);

      // Reset isReturningFromGame after the loading is complete
      const controlsTimer = setTimeout(() => {
        setIsReturningFromGame(false);
      }, 2000);
      timers.push(controlsTimer);

      // Show progress notification only if progress was actually updated
      if (location.state?.updatedProgress !== undefined) {
        const currentProgress = parseInt(localStorage.getItem('gameProgress') || '0');
        // Only show notification if progress actually changed
        if (currentProgress > (currentProgress - 25)) {
          setProgressValues({
            start: Math.max(0, currentProgress - 25),
            end: currentProgress
          });
          
          // Show progress notification after loading screen
          const notificationTimer = setTimeout(() => {
            setShowProgressNotification(true);
            // Hide notification after 5 seconds
            setTimeout(() => {
              setShowProgressNotification(false);
            }, 5000);
          }, 2000);
          timers.push(notificationTimer);
        }
      }

      // Check both localStorage and location state for game state
      const savedState = localStorage.getItem('lastGameState');
      const locationState = location.state?.gameState;

      if (locationState) {
        restoreGameState(locationState);
      } else if (savedState) {
        restoreGameState(JSON.parse(savedState));
      }

      // Clear saved states
      localStorage.removeItem('lastGameState');
    }

    // Cleanup function that clears all timers
    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [location.state]);

  const memoizedXBtn = useMemo(() => <XBtn position={playerPosition} />, [playerPosition]);
  const memoizedControls = useMemo(
    () => <Controls onClose={() => setShowControls(false)} />,
    [setShowControls]
  );

  return (
    <>
      {loading && <Loader fadeOut={fadeOut} isReturning={isReturningFromGame} />}
      {navigating && (
        <div className="fixed inset-0 z-50 backdrop-blur-md">
          <InitialLoader transparent={true} />
        </div>
      )}
      {showProgressNotification && (
        <ProgressNotification 
          startValue={progressValues.start+25}
          endValue={progressValues.end+25}
          onComplete={() => setShowProgressNotification(false)}
        />
      )}
      <div className={`transition-opacity duration-500 ${!loading ? 'opacity-100' : 'opacity-0'}`}>
        <canvas ref={canvasRef} />
        {!showDialog && !showKnowledgeBook && xButton && memoizedXBtn}
        {!loading && <Navbar />}
        {!loading && showControls && !isReturningFromGame && memoizedControls}
        {!loading && showMap && (
          <MapView 
            onClose={() => setShowMap(false)} 
            playerPosition={playerPosition}
          />
        )}
        {showGuide && <Guide onClose={() => setShowGuide(false)} />}
        {showKnowledgeBook && (
          <KnowledgeBook 
            onClose={handleKnowledgeBookClose}
          />
        )}
        {showDialog && (
          <Dialog
            npcId={currentNpcId}
            onClose={handleDialogClose}
          />
        )}
      </div>
    </>
  );
}

export default Canvas;

