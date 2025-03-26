
import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, MeshReflectorMaterial, useTexture, Text } from '@react-three/drei';
import * as THREE from 'three';

// Component pour le véhicule principal
const MainVehicle = ({ position = [0, 0, 0], rotation = [0, 0, 0] }) => {
  // Simuler un véhicule avec des formes simples
  return (
    <group position={new THREE.Vector3(...position)} rotation={new THREE.Euler(...rotation)}>
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[4, 1, 2]} />
        <meshStandardMaterial color="#102a54" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0, 1.2, 0]}>
        <boxGeometry args={[2.5, 0.8, 1.8]} />
        <meshStandardMaterial color="#102a54" metalness={0.9} roughness={0.1} />
      </mesh>
      <Wheels />
    </group>
  );
};

// Composant pour les roues du véhicule
const Wheels = () => {
  const wheelPositions = [
    [-1.5, 0, -1], // avant gauche
    [1.5, 0, -1], // avant droit
    [-1.5, 0, 1], // arrière gauche
    [1.5, 0, 1], // arrière droit
  ];

  return (
    <>
      {wheelPositions.map((position, index) => (
        <mesh key={index} position={new THREE.Vector3(...position)}>
          <cylinderGeometry args={[0.5, 0.5, 0.3, 32]} />
          <meshStandardMaterial color="black" roughness={0.8} />
        </mesh>
      ))}
    </>
  );
};

// Composant pour le sol réfléchissant
const Floor = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.001, 0]}>
      <planeGeometry args={[50, 50]} />
      <MeshReflectorMaterial
        blur={[400, 100]}
        resolution={1024}
        mixBlur={1}
        mixStrength={15}
        depthScale={1}
        minDepthThreshold={0.85}
        color="#050505"
        metalness={0.8}
        roughness={0.5}
        mirror={0.5}
      />
    </mesh>
  );
};

// Lumières pour la scène
const Lights = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <spotLight 
        position={[10, 10, 10]} 
        angle={0.15} 
        penumbra={1} 
        intensity={1} 
        castShadow 
        shadow-mapSize={[2048, 2048]} 
      />
      <spotLight 
        position={[-10, 10, -10]} 
        angle={0.15} 
        penumbra={1} 
        intensity={0.5} 
        color="#4169e1" 
        castShadow 
      />
    </>
  );
};

// Piliers décoratifs pour le showroom
const Pillars = () => {
  return (
    <>
      <mesh position={[10, 2, -10]}>
        <cylinderGeometry args={[0.5, 0.5, 4, 32]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.3} roughness={0.3} />
      </mesh>
      
      <mesh position={[-10, 2, -10]}>
        <cylinderGeometry args={[0.5, 0.5, 4, 32]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.3} roughness={0.3} />
      </mesh>
      
      <mesh position={[10, 2, 10]}>
        <cylinderGeometry args={[0.5, 0.5, 4, 32]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.3} roughness={0.3} />
      </mesh>
      
      <mesh position={[-10, 2, 10]}>
        <cylinderGeometry args={[0.5, 0.5, 4, 32]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.3} roughness={0.3} />
      </mesh>
    </>
  );
};

// Animation de particules pour l'effet "wow"
const Particles = () => {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 2000;
  const [positions, setPositions] = useState<Float32Array | null>(null);
  
  useEffect(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 20;
      positions[i3 + 1] = Math.random() * 10;
      positions[i3 + 2] = (Math.random() - 0.5) * 20;
    }
    setPositions(positions);
  }, []);
  
  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });
  
  if (!positions) return null;
  
  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#4169e1" sizeAttenuation transparent opacity={0.8} />
    </points>
  );
};

// Animation de la caméra pour l'introduction
const CameraAnimation = ({ onComplete }: { onComplete: () => void }) => {
  const { camera } = useThree();
  const [animationStage, setAnimationStage] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 8000);
    
    return () => {
      clearTimeout(timer);
    };
  }, [onComplete]);
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    // Animation en plusieurs étapes
    if (t < 3) {
      // Étape 1: Caméra éloignée qui s'approche
      camera.position.set(
        20 - t * 3, 
        10 - t * 2, 
        20 - t * 3
      );
      setAnimationStage(0);
    } else if (t < 6) {
      // Étape 2: Orbite autour du véhicule
      const angle = (t - 3) * Math.PI / 2;
      camera.position.set(
        Math.sin(angle) * 8, 
        5, 
        Math.cos(angle) * 8
      );
      setAnimationStage(1);
    } else {
      // Étape 3: Position finale
      camera.position.set(8, 4, 8);
      setAnimationStage(2);
    }
    
    // Toujours regarder l'origine
    camera.lookAt(0, 0, 0);
  });
  
  return (
    <group>
      {animationStage >= 1 && (
        <Text
          position={[0, 6, 0]}
          fontSize={1}
          color="#ff9800"
          font="/fonts/inter-bold.woff"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.05}
          outlineColor="#ff6000"
        >
          Auto Adi
        </Text>
      )}
    </group>
  );
};

// Composant principal de la scène 3D
const Scene3D = ({ onComplete }: { onComplete: () => void }) => {
  return (
    <>
      <color attach="background" args={['#050505']} />
      <fog attach="fog" args={['#050505', 10, 50]} />
      <CameraAnimation onComplete={onComplete} />
      <Lights />
      <MainVehicle position={[0, 0, 0]} rotation={[0, Math.PI / 6, 0]} />
      <Particles />
      <Floor />
      <Pillars />
      <Environment preset="night" />
    </>
  );
};

// Composant d'enveloppe pour la scène 3D héroïque
const HeroScene3D = ({ onComplete }: { onComplete: () => void }) => {
  // Son d'ambiance pour l'introduction
  useEffect(() => {
    // Créer un élément audio pour jouer le son d'ambiance
    const ambientSound = new Audio('/sounds/ambient.mp3');
    ambientSound.volume = 0.3;
    ambientSound.loop = true;
    
    // Essayer de jouer le son, mais capturer les erreurs (certains navigateurs bloquent l'autoplay)
    const playPromise = ambientSound.play();
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.log("L'autoplay a été empêché:", error);
      });
    }
    
    // Nettoyer l'audio quand le composant est démonté
    return () => {
      ambientSound.pause();
      ambientSound.currentTime = 0;
    };
  }, []);

  return (
    <div className="w-full h-[80vh] relative">
      <Canvas shadows dpr={[1, 2]}>
        <Scene3D onComplete={onComplete} />
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2.5}
        />
      </Canvas>
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white text-center">
        <p className="text-lg animate-pulse">Découvrez notre sélection de véhicules d'exception</p>
      </div>
    </div>
  );
};

export default HeroScene3D;
