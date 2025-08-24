import React, { useCallback } from "react";
import Particles from "react-tsparticles";
import { Engine } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";
import { useTheme } from "@/contexts/ThemeContext";

const ParticlesBackground: React.FC = () => {
  const { theme } = useTheme();
  
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fpsLimit: 60,
        fullScreen: {
          enable: true,
          zIndex: -1,
        },
        background: {
          color: {
            value: "transparent", 
          },
        },
        particles: {
          color: {
            value: theme === "dark" ? "#ffffff" : "#7E69AB", // Secondary Purple for light theme
          },
          links: {
            color: theme === "dark" ? "#ffffff" : "#6E59A5", // Tertiary Purple for light theme
            distance: 150,
            enable: true,
            opacity: theme === "dark" ? 0.25 : 0.4,
            width: theme === "dark" ? 1 : 1,
          },
          collisions: {
            enable: true,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: true,
            speed: theme === "dark" ? 0.8 : 0.6,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 1600,
            },
            value: theme === "dark" ? 25 : 10, // Reduced number of particles
            limit: theme === "dark" ? 35 : 15, // Reduced limit
          },
          opacity: {
            value: {
              min: theme === "dark" ? 0.15 : 0.2,
              max: theme === "dark" ? 0.4 : 0.5,
            },
            animation: {
              enable: true,
              speed: 0.8,
              minimumValue: theme === "dark" ? 0.1 : 0.1,
            },
          },
          shape: {
            type: "circle",
          },
          size: {
            value: {
              min: 0.8,
              max: theme === "dark" ? 2.2 : 1.8,
            },
          },
          twinkle: {
            particles: {
              enable: true,
              frequency: 0.1,
              opacity: theme === "dark" ? 0.8 : 0.7,
            },
          },
        },
        interactivity: {
          events: {
            onHover: {
              enable: false, // Disable hover interaction
              mode: "grab",
              parallax: {
                enable: true,
                force: 20,
                smooth: 10,
              },
            },
            onClick: {
              enable: false, // Disable click/tap interaction
              mode: "push",
            },
            resize: true,
          },
          modes: {
            grab: {
              distance: 180,
              links: {
                opacity: theme === "dark" ? 0.6 : 0.7,
                color: theme === "dark" ? "#ffffff" : "#7E69AB", // Secondary Purple for light theme
              }
            },
            push: {
              quantity: 1,
              limit: 5,    
            },
            repulse: {
              distance: 150,
              duration: 0.5,
            }
          },
          detectRetina: true,
        },
      }}
    />
  );
};

export default ParticlesBackground;
