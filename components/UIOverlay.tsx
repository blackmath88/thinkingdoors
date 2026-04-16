'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useStore, ROOM_THEMES, type RoomId } from '@/store/useStore'

// ─── Constants ───────────────────────────────────────────────────────────────

const ROOM_IDS: RoomId[] = ['cartoon', 'future', 'chaos', 'debate', 'cross']

// ─── Door Card ────────────────────────────────────────────────────────────────

interface DoorCardProps {
  roomId: RoomId
  index: number
}

function DoorCard({ roomId, index }: DoorCardProps) {
  const theme = ROOM_THEMES[roomId]
  const setActiveRoom = useStore((s) => s.setActiveRoom)
  const setDoorHover = useStore((s) => s.setDoorHover)
  const isHovered = useStore((s) => s.doorStates[roomId].isHovered)

  return (
    <motion.button
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24, scale: 0.92 }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: 'easeOut' }}
      onHoverStart={() => setDoorHover(roomId, true)}
      onHoverEnd={() => setDoorHover(roomId, false)}
      onClick={() => setActiveRoom(roomId)}
      className="
        relative flex flex-col items-start gap-2 rounded-2xl border
        px-5 py-4 backdrop-blur-md text-left
        border-white/10 bg-white/5
        hover:bg-white/10 hover:border-white/20
        focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40
        transition-colors duration-300
      "
    >
      {/* Accent glow dot */}
      <span
        className="absolute top-3 right-3 h-2 w-2 rounded-full transition-all duration-300"
        style={{
          background: theme.accentColor,
          boxShadow: isHovered
            ? `0 0 10px 3px ${theme.accentColor}80`
            : 'none',
        }}
      />

      <span
        className="text-xs font-semibold tracking-widest uppercase"
        style={{ color: theme.accentColor }}
      >
        Door {index + 1}
      </span>

      <span className="text-sm font-medium text-white/80">{theme.label}</span>

      <span className="text-xs text-white/40 leading-relaxed line-clamp-2">
        {theme.question}
      </span>
    </motion.button>
  )
}

// ─── Room Panel ───────────────────────────────────────────────────────────────

function RoomPanel() {
  const activeRoom = useStore((s) => s.activeRoom)
  const returnToCorridor = useStore((s) => s.returnToCorridor)

  if (!activeRoom) return null

  const theme = ROOM_THEMES[activeRoom]

  return (
    <motion.div
      key={activeRoom}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.88 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="
        relative w-full max-w-xl rounded-3xl border border-white/10
        bg-white/5 backdrop-blur-xl p-8 flex flex-col gap-6
      "
      style={{ boxShadow: `0 0 60px 4px ${theme.accentColor}25` }}
    >
      {/* Threshold text */}
      <p
        className="font-serif text-sm italic tracking-wide"
        style={{ color: theme.accentColor }}
      >
        {theme.threshold}
      </p>

      {/* Room name */}
      <h2 className="text-2xl font-semibold text-white">{theme.label}</h2>

      {/* Entry question */}
      <p className="text-white/60 text-sm leading-relaxed">{theme.question}</p>

      {/* Thinking textarea */}
      <textarea
        rows={5}
        placeholder="Begin thinking here…"
        className="
          w-full resize-none rounded-xl border border-white/10
          bg-black/40 p-4 text-sm text-white/80 placeholder-white/20
          focus:outline-none transition-all duration-300
        "
        onFocus={(e) => {
          e.currentTarget.style.boxShadow = `0 0 0 2px ${theme.accentColor}80`
          e.currentTarget.style.borderColor = `${theme.accentColor}60`
        }}
        onBlur={(e) => {
          e.currentTarget.style.boxShadow = 'none'
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
        }}
      />

      {/* Return button */}
      <button
        onClick={returnToCorridor}
        className="
          self-start rounded-xl border border-white/10 bg-white/5
          px-5 py-2.5 text-sm text-white/60 backdrop-blur-sm
          hover:bg-white/10 hover:text-white/90
          focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30
          transition-all duration-200
        "
      >
        ↩ Bring insight back
      </button>
    </motion.div>
  )
}

// ─── Main Overlay ─────────────────────────────────────────────────────────────

export function UIOverlay() {
  const activeRoom = useStore((s) => s.activeRoom)

  return (
    <div className="pointer-events-none fixed inset-0 z-10 flex items-center justify-center">
      {/* Doors grid – visible when no room is active */}
      <AnimatePresence>
        {activeRoom === null && (
          <motion.div
            key="doors"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="pointer-events-auto w-full max-w-2xl px-6"
          >
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="mb-8 text-center"
            >
              <h1 className="text-2xl font-semibold tracking-tight text-white/90">
                Corridor of Efficiency
              </h1>
              <p className="mt-2 text-xs tracking-widest uppercase text-white/30">
                Choose a door to escape
              </p>
            </motion.div>

            {/* Door grid */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {ROOM_IDS.map((id, i) => (
                <DoorCard key={id} roomId={id} index={i} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Room panel – visible when a room is active */}
      <AnimatePresence>
        {activeRoom !== null && (
          <div className="pointer-events-auto w-full max-w-xl px-6">
            <RoomPanel />
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
