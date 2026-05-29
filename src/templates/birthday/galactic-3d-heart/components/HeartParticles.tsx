import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

export const HeartParticles = () => {
  const pointsRef = useRef<THREE.Points>(null);
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(6000); // 2000 points * 3 (x,y,z)
    for (let i = 0; i < 2000; i++) {
      const t = Math.random() * Math.PI * 2;
      const x = 16 * Math.pow(Math.sin(t), 3);
      const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
      const z = (Math.random() - 0.5) * 5 * Math.random();
      
      // Apply scale
      positions[3 * i] = 0.15 * x;
      positions[3 * i + 1] = 0.15 * y;
      positions[3 * i + 2] = z;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = 0.2 * Math.sin(0.5 * state.clock.elapsedTime);
      pointsRef.current.position.y = 0.1 * Math.sin(state.clock.elapsedTime);
    }
  });

  return (
    <group position={[0, 0, 0]}>
      <Points
        ref={pointsRef as any}
        positions={particlesPosition}
        stride={3}
        frustumCulled={false}
      >
        <PointMaterial
          transparent
          color="#ffb6c1"
          size={0.05}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
};

export default HeartParticles;
