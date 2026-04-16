import { SceneLoader } from '@/components/SceneLoader'
import { UIOverlay } from '@/components/UIOverlay'

export default function HomePage() {
  return (
    <main className="relative h-screen w-screen overflow-hidden">
      <SceneLoader />
      <UIOverlay />
    </main>
  )
}
