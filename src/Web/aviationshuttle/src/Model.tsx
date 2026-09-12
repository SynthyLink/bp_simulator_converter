import React from 'react';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';

// Define the expected output structure if you need typed nodes/materials
interface GLTFResult extends GLTF {
    nodes: Record<string, THREE.Object3D>;
    materials: Record<string, THREE.Material>;
}

export function Model() {
    // Load the GLB from the public folder
    const gltf = useGLTF('/SpaceShuttle.glb') as GLTFResult;

    // Render the entire scene graph inside the R3F Canvas
    return <primitive object={gltf.scene} scale={1} position={[0, 0, 0]} />;
}

// Preload the asset so it begins downloading before the component mounts
useGLTF.preload('/SpaceShuttle.glb');
