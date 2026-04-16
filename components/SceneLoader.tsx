'use client'

import dynamic from 'next/dynamic'

// next/dynamic with ssr:false must be inside a Client Component in Next.js 15
const Scene = dynamic(
  () => import('@/components/3d/Scene').then((m) => m.Scene),
  { ssr: false },
)

export function SceneLoader() {
  return <Scene />
}
