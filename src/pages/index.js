import "./style.css"
import React from "react"
import { Canvas } from "react-three-fiber"

export default function Home() {
  return (
    <Canvas>
      <mesh>
        <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
        <meshBasicMaterial attach="material" color="red" />
      </mesh>
    </Canvas>
  )
}
