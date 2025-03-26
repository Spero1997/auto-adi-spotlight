
import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber';
import { 
  Environment, 
  PerspectiveCamera, 
  OrbitControls, 
  useTexture, 
  useGLTF, 
  BakeShadows, 
  AccumulativeShadows, 
  RandomizedLight,
  Text,
  Effects
} from '@react-three/drei';
import { Suspense } from 'react';
import * as THREE from 'three';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useControls } from 'leva';

// Shader pour les effets de post-processing
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float time;
  uniform vec3 vehicleColor;
  varying vec2 vUv;
  
  void main() {
    vec2 uv = vUv;
    
    // Effet de chromatic aberration
    float aberration = 0.01;
    vec2 direction = normalize(vec2(0.5) - uv);
    vec3 color = vec3(0.0);
    
    // Mélange de couleurs bleu/orange avec la couleur du véhicule
    vec3 blueColor = vec3(0.1, 0.2, 0.6);
    vec3 orangeColor = vec3(0.6, 0.3, 0.1);
    vec3 reflection = mix(blueColor, orangeColor, vehicleColor.r);
    
    // Effet vignette
    float vignetteStrength = 1.2;
    float vignette = smoothstep(0.0, 0.8, length(uv - vec2(0.5)) * vignetteStrength);
    
    // Pulsation subtile
    float pulse = sin(time * 0.5) * 0.05 + 0.95;
    
    gl_FragColor = vec4(reflection * (1.0 - vignette) * pulse, 1.0);
  }
`;

// Composant pour la voiture 3D (placeholder)
const Car = ({ color = new THREE.Color(0x1a3c6e) }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1;
    }
  });
  
  // Effet de matériaux PBR
  const carMaterial = new THREE.MeshStandardMaterial({
    color: color,
    metalness: 0.9,
    roughness: 0.1,
    envMapIntensity: 1
  });
  
  return (
    <group position={[0, 0, 0]}>
      <mesh ref={meshRef} castShadow receiveShadow>
        <meshStandardMaterial {...carMaterial} />
        <boxGeometry args={[3, 1, 6]} />
        
        {/* Roues */}
        <group position={[1.5, -0.5, 2]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.7, 0.7, 0.3, 32]} rotation={[Math.PI / 2, 0, 0]} />
            <meshStandardMaterial color="#111" metalness={0.5} roughness={0.4} />
          </mesh>
        </group>
        <group position={[-1.5, -0.5, 2]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.7, 0.7, 0.3, 32]} rotation={[Math.PI / 2, 0, 0]} />
            <meshStandardMaterial color="#111" metalness={0.5} roughness={0.4} />
          </mesh>
        </group>
        <group position={[1.5, -0.5, -2]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.7, 0.7, 0.3, 32]} rotation={[Math.PI / 2, 0, 0]} />
            <meshStandardMaterial color="#111" metalness={0.5} roughness={0.4} />
          </mesh>
        </group>
        <group position={[-1.5, -0.5, -2]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.7, 0.7, 0.3, 32]} rotation={[Math.PI / 2, 0, 0]} />
            <meshStandardMaterial color="#111" metalness={0.5} roughness={0.4} />
          </mesh>
        </group>
      </mesh>
      
      {/* Phares */}
      <pointLight position={[1.5, 0, 3]} intensity={2} color="#fff" distance={10} decay={2} />
      <pointLight position={[-1.5, 0, 3]} intensity={2} color="#fff" distance={10} decay={2} />
    </group>
  );
};

// Composant pour le sol réfléchissant
const Floor = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
      <planeGeometry args={[50, 50]} />
      <meshStandardMaterial 
        color="#111" 
        metalness={0.8} 
        roughness={0.2} 
        envMapIntensity={0.5} 
      />
    </mesh>
  );
};

// Composant pour les particules
const Particles = () => {
  const count = 5000;
  const positions = useRef<Float32Array>(new Float32Array(count * 3));
  const pointsRef = useRef<THREE.Points>(null);

  useEffect(() => {
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions.current[i3] = (Math.random() - 0.5) * 20;
      positions.current[i3 + 1] = (Math.random() - 0.5) * 10;
      positions.current[i3 + 2] = (Math.random() - 0.5) * 20;
    }
  }, []);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute 
          attach="attributes-position" 
          count={count} 
          array={positions.current} 
          itemSize={3} 
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.03} 
        color="#4080ff" 
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

// Post-processing
const PostProcessing = () => {
  const uniformsRef = useRef({
    time: { value: 0 },
    vehicleColor: { value: new THREE.Color(0x1a3c6e) }
  });

  useFrame((state, delta) => {
    uniformsRef.current.time.value += delta;
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial 
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniformsRef.current}
        transparent
        depthTest={false}
      />
    </mesh>
  );
};

// Composant avec le contenu textuel qui apparaît sur la scène 3D
const HeroContent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <group position={[0, 2, 0]} visible={visible}>
      <Text
        position={[0, 1, 0]}
        fontSize={1}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter-bold.woff"
        letterSpacing={0.1}
      >
        L'Art de l'Automobile
      </Text>
    </group>
  );
};

// Effet de brouillard volumétrique
const VolumetricFog = () => {
  const fogRef = useRef<THREE.Fog>(null);
  
  useFrame((state, delta) => {
    if (state.scene.fog) {
      // Dynamically change fog density/color
      const fog = state.scene.fog as THREE.Fog;
      fog.far = 20 + Math.sin(state.clock.elapsedTime * 0.2) * 2;
    }
  });
  
  useEffect(() => {
    const fog = new THREE.Fog('#070b1a', 5, 20);
    return () => {
      // Clean up
    };
  }, []);

  return null;
};

interface HeroScene3DProps {
  onComplete?: () => void;
}

// Composant principal exporté
const HeroScene3D: React.FC<HeroScene3DProps> = ({ onComplete }) => {
  const [introComplete, setIntroComplete] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Créer l'élément audio pour le son d'ambiance
    const audio = new Audio('/sounds/engine-start.mp3');
    audio.volume = 0.4;
    audio.loop = false;
    audioRef.current = audio;
    
    // Jouer le son après un court délai
    const timer = setTimeout(() => {
      audio.play().catch(e => console.log('Audio playback prevented:', e));
    }, 1000);

    // Marquer l'intro comme terminée après 8 secondes
    const introTimer = setTimeout(() => {
      setIntroComplete(true);
      if (onComplete) onComplete();
    }, 8000);
    
    // Nettoyage
    return () => {
      clearTimeout(timer);
      clearTimeout(introTimer);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [onComplete]);

  // Contrôles pour les développeurs (désactivés en production)
  const isDev = process.env.NODE_ENV === 'development';
  const controls = useControls({
    intensity: { value: 1, min: 0, max: 5, step: 0.1 },
    envMapIntensity: { value: 1, min: 0, max: 5, step: 0.1 },
    shadows: true,
    roughness: { value: 0.1, min: 0, max: 1, step: 0.01 },
    metalness: { value: 0.9, min: 0, max: 1, step: 0.01 },
  }, { collapsed: true, hidden: !isDev });

  return (
    <div className="relative w-full h-[85vh] overflow-hidden bg-black">
      {/* Overlay pour la phase d'introduction */}
      {!introComplete && (
        <div className="absolute inset-0 z-10 bg-black bg-opacity-70 flex items-center justify-center transition-opacity duration-1000">
          <div className="text-white text-4xl md:text-6xl font-bold tracking-wider animate-pulse">
            AUTO ADI
          </div>
        </div>
      )}
      
      {/* Contenu principal avec scène 3D */}
      <Canvas 
        shadows 
        dpr={[1, 2]} 
        gl={{ 
          antialias: true, 
          powerPreference: "high-performance",
          alpha: false,
          stencil: false
        }}
        camera={{ position: [0, 2, 10], fov: 45 }}
      >
        <color attach="background" args={['#070b1a']} />
        <fog attach="fog" args={['#070b1a', 5, 20]} />
        
        <Suspense fallback={null}>
          <Environment preset="studio" />
          
          {/* Caméra animée */}
          <PerspectiveCamera 
            makeDefault 
            position={[3, 2, 8]} 
            fov={35} 
            near={0.1} 
            far={100}
          />
          
          {/* Contrôles de caméra limités */}
          <OrbitControls 
            enablePan={false}
            enableZoom={true}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2.2}
            minDistance={5}
            maxDistance={15}
          />
          
          {/* Éclairage */}
          <ambientLight intensity={0.2} />
          <directionalLight
            position={[5, 8, 5]}
            intensity={controls?.intensity || 1}
            castShadow
            shadow-mapSize={1024}
          />
          <spotLight 
            position={[-5, 8, -5]} 
            intensity={0.5} 
            angle={0.25} 
            penumbra={0.5}
            castShadow
          />
          
          {/* Effets d'éclairage avancés */}
          <AccumulativeShadows 
            frames={100} 
            alphaTest={0.85} 
            opacity={0.8} 
            scale={10} 
            position={[0, -0.99, 0]}
          >
            <RandomizedLight 
              amount={8} 
              radius={4} 
              ambient={0.5} 
              intensity={1} 
              position={[5, 5, -10]} 
              bias={0.001} 
            />
          </AccumulativeShadows>
          
          {/* Sol réfléchissant */}
          <Floor />
          
          {/* Voiture 3D */}
          <Car />
          
          {/* Particules et effets atmosphériques */}
          <Particles />
          <VolumetricFog />
          
          {/* Contenu textuel */}
          <HeroContent />
          
          {/* Post-processing */}
          <Effects>
            <PostProcessing />
          </Effects>
          
          <BakeShadows />
        </Suspense>
      </Canvas>
      
      {/* Overlay UI avec appel à l'action */}
      <div className="absolute bottom-20 left-0 right-0 z-20 flex justify-center">
        <div className="bg-black/60 backdrop-blur-sm p-6 rounded-lg max-w-lg text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Découvrez l'excellence automobile</h2>
          <p className="text-gray-300 mb-6">Des véhicules d'exception sélectionnés avec passion pour des conducteurs exigeants.</p>
          <div className="flex space-x-4 justify-center">
            <Link to="/vehicules/occasion">
              <Button className="bg-brand-orange hover:bg-brand-lightOrange text-white px-6 py-3 text-lg">
                Explorer notre collection
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroScene3D;
