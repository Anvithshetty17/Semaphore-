import React, { Suspense } from "react";
import { useGLTF } from "@react-three/drei";

export const CityNeonModel = (props) => {
  // Load the GLB model from public/models/cityneon2.glb
  const { scene } = useGLTF("/models/cityneon2.glb");
  return (
    <Suspense fallback={null}>
      <primitive object={scene} {...props} />
    </Suspense>
  );
};

// Optionally, for performance, preload the model
useGLTF.preload("/models/cityneon2.glb");
