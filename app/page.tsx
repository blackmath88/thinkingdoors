import dynamic from 'next/dynamic'
import { UIOverlay } from '@/components/UIOverlay'

// Dynamically import to avoid SSR with Three.js / WebGL
const Scene = dynamic(
  () => import('@/components/3d/Scene').then((m) => m.Scene),
  { ssr: false },
)

export default function HomePage() {
  return (
    <main className="relative h-screen w-screen overflow-hidden">
      <Scene />
      <UIOverlay />
    </main>
  )
}
