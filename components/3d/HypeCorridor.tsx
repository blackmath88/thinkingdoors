'use client'

import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'
import { useStore, ROOM_THEMES, type RoomId } from '@/store/useStore'

// ─── Constants ───────────────────────────────────────────────────────────────

const WORD_COUNT = 180
const TUNNEL_RADIUS = 8
const Z_NEAR = 5       // reset threshold (just behind camera)
const Z_FAR = -100     // respawn depth
const BASE_SPEED = 0.04
const SLOW_SPEED = 0.003

const HYPE_WORDS = [
  'Robust', 'Delve', 'Synergistic', 'Scale', 'LLM', 'AGI', 'Alignment',
  'Paradigm', 'Disruptive', 'Leverage', 'Optimize', 'Holistic', 'Agile',
  'Ecosystem', 'Stakeholder', 'Deliverable', 'Actionable', 'Bandwidth',
  'Blockchain', 'Tokenize', 'Pivot', 'Iterate', 'Boil-the-ocean', 'Synergy',
  'Innovation', 'Disruption', 'Ideate', 'Productize', 'Frictionless',
  'Seamless', 'Best-in-class', 'Thought-leader', 'Move-the-needle',
  'Core-competency', 'Value-add', 'Deep-dive', 'ROI', 'KPI', 'OKR',
  'Hyperscale', 'Multi-modal', 'Foundation Model', 'RLHF', 'Fine-tune',
  'Emergent', 'Hallucinate', 'Vector DB', 'RAG', 'Copilot', 'Orchestrate',
  'Agentic', 'Autonomous', 'Next-gen', 'Generative', 'Neural', 'Inference',
]

// ─── Types ────────────────────────────────────────────────────────────────────

interface WordData {
  initialPosition: [number, number, number]
  word: string
  opacity: number
  fontSize: number
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function randomTunnelXY(): [number, number] {
  const angle = Math.random() * Math.PI * 2
  const r = TUNNEL_RADIUS * (0.3 + Math.random() * 0.7)
  return [Math.cos(angle) * r, Math.sin(angle) * r]
}

function buildWordData(): WordData[] {
  return Array.from({ length: WORD_COUNT }, () => {
    const [x, y] = randomTunnelXY()
    return {
      initialPosition: [x, y, Z_FAR * Math.random()] as [number, number, number],
      word: HYPE_WORDS[Math.floor(Math.random() * HYPE_WORDS.length)],
      opacity: 0.15 + Math.random() * 0.55,
      fontSize: 0.18 + Math.random() * 0.42,
    }
  })
}

// ─── Single animated word ─────────────────────────────────────────────────────

interface WordMeshProps {
  data: WordData
  speedRef: React.MutableRefObject<number>
}

function WordMesh({ data, speedRef }: WordMeshProps) {
  const ref = useRef<THREE.Mesh>(null!)

  useFrame(() => {
    if (!ref.current) return
    ref.current.position.z += speedRef.current
    if (ref.current.position.z > Z_NEAR) {
      const [x, y] = randomTunnelXY()
      ref.current.position.set(x, y, Z_FAR)
    }
  })

  return (
    <Text
      ref={ref}
      position={data.initialPosition}
      fontSize={data.fontSize}
      color="#4a4a6a"
      fillOpacity={data.opacity}
      anchorX="center"
      anchorY="middle"
      letterSpacing={0.05}
    >
      {data.word}
    </Text>
  )
}

// ─── Main corridor ────────────────────────────────────────────────────────────

export function HypeCorridor() {
  const { scene } = useThree()
  const activeRoom = useStore((s) => s.activeRoom)

  const words = useMemo(() => buildWordData(), [])

  // Shared mutable speed so all WordMesh instances read it each frame
  const speedRef = useRef(BASE_SPEED)
  const targetFogColor = useRef(new THREE.Color(0x0a0a0f))

  useFrame(() => {
    // Smoothly lerp speed
    const target = activeRoom ? SLOW_SPEED : BASE_SPEED
    speedRef.current += (target - speedRef.current) * 0.03

    // Smoothly lerp fog color
    if (activeRoom) {
      targetFogColor.current.set(ROOM_THEMES[activeRoom as RoomId].fogColor)
    } else {
      targetFogColor.current.set(0x0a0a0f)
    }
    const fog = scene.fog as THREE.FogExp2 | null
    if (fog?.color) {
      fog.color.lerp(targetFogColor.current, 0.02)
    }
  })

  return (
    <>
      {words.map((data, i) => (
        <WordMesh key={i} data={data} speedRef={speedRef} />
      ))}
    </>
  )
}
