import "./style.css"

import React, { useState, useRef } from "react"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { Canvas, useFrame, extend, useThree } from "react-three-fiber"
import { a, useSpring } from "react-spring/three"

extend({ OrbitControls })

function Controls() {
  const orbitRefs = useRef()
  const { camera, gl } = useThree()

  useFrame(() => {
    orbitRefs.current.update()
  })

  return (
    <orbitControls
      ref={orbitRefs}
      autoRotate
      enableDamping
      maxPolarAngle={Math.PI / 3}
      minPolarAngle={Math.PI / 3}
      args={[camera, gl.domElement]}
    />
  )
}

function Plane() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 2]} position={[0, -0.5, 0]}>
      <planeBufferGeometry attach="geometry" args={[100, 100]} />
      <meshPhysicalMaterial attach="material" color="red" />
    </mesh>
  )
}

function Box() {
  const meshRef = useRef()
  const [hovered, setHover] = useState(false)
  const [activated, setActive] = useState(false)
  const props = useSpring({
    scale: activated ? [1.5, 1.5, 1.5] : [1, 1, 1],
    color: hovered ? "hotpink" : "gray",
  })

  return (
    <a.mesh
      ref={meshRef}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      onClick={() => setActive(!activated)}
      scale={props.scale}
    >
      <ambientLight intensity={Math.PI / 8} />
      <spotLight position={[0, 5, 10]} penumbra={1} />
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <a.meshPhysicalMaterial attach="material" color={props.color} />
    </a.mesh>
  )
}

export default function Home() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <fog attach="fog" args={["white", 5, 10]} />
      <Controls />
      <Box />
      <Plane />
    </Canvas>
  )
}
