'use client'

import { Canvas } from '@react-three/fiber'
import { FogExp2 } from 'three'
import { HypeCorridor } from './HypeCorridor'

export function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 0], fov: 75, near: 0.1, far: 200 }}
      style={{ position: 'fixed', inset: 0, background: '#0a0a0f' }}
      gl={{ antialias: true }}
      onCreated={({ scene }) => {
        scene.fog = new FogExp2(0x0a0a0f, 0.045)
      }}
    >
      <HypeCorridor />
    </Canvas>
  )
}
