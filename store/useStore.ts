import { create } from 'zustand'

// ─── Room IDs & Themes ───────────────────────────────────────────────────────

export type RoomId = 'cartoon' | 'future' | 'chaos' | 'debate' | 'cross'

export interface RoomTheme {
  fogColor: string
  accentColor: string
  label: string
  question: string
  threshold: string
}

export const ROOM_THEMES: Record<RoomId, RoomTheme> = {
  cartoon: {
    fogColor: '#1a0a2e',
    accentColor: '#a855f7',
    label: 'Cartoon Room',
    question: 'If your problem were a Saturday morning cartoon, who is the villain?',
    threshold: 'You are leaving the Corridor of Efficiency.',
  },
  future: {
    fogColor: '#001a33',
    accentColor: '#38bdf8',
    label: 'Future Room',
    question: 'What does this look like in ten years if nothing changes?',
    threshold: 'You are entering the domain of not-yet.',
  },
  chaos: {
    fogColor: '#1a0a00',
    accentColor: '#f97316',
    label: 'Chaos Room',
    question: 'What is the worst possible interpretation of this situation?',
    threshold: 'Order is a cope. Welcome.',
  },
  debate: {
    fogColor: '#0a1a00',
    accentColor: '#4ade80',
    label: 'Debate Room',
    question: 'What is the strongest argument against your current position?',
    threshold: 'Steel-man the opposition.',
  },
  cross: {
    fogColor: '#1a1a00',
    accentColor: '#facc15',
    label: 'Cross-Domain Room',
    question: 'Which field outside your own has already solved this?',
    threshold: 'Everything is the same problem in disguise.',
  },
}

// ─── Door state ──────────────────────────────────────────────────────────────

export interface DoorState {
  isHovered: boolean
  isActive: boolean
}

export type DoorStates = Record<RoomId, DoorState>

const DEFAULT_DOOR_STATES: DoorStates = {
  cartoon: { isHovered: false, isActive: false },
  future:  { isHovered: false, isActive: false },
  chaos:   { isHovered: false, isActive: false },
  debate:  { isHovered: false, isActive: false },
  cross:   { isHovered: false, isActive: false },
}

// ─── Store interface ──────────────────────────────────────────────────────────

interface StoreState {
  activeRoom: RoomId | null
  doorStates: DoorStates
  setActiveRoom: (room: RoomId | null) => void
  returnToCorridor: () => void
  setDoorHover: (room: RoomId, isHovered: boolean) => void
}

// ─── Store implementation ─────────────────────────────────────────────────────

export const useStore = create<StoreState>((set) => ({
  activeRoom: null,
  doorStates: DEFAULT_DOOR_STATES,

  setActiveRoom: (room) =>
    set((state) => ({
      activeRoom: room,
      doorStates: room
        ? {
            ...state.doorStates,
            [room]: { ...state.doorStates[room], isActive: true },
          }
        : state.doorStates,
    })),

  returnToCorridor: () =>
    set({ activeRoom: null, doorStates: DEFAULT_DOOR_STATES }),

  setDoorHover: (room, isHovered) =>
    set((state) => ({
      doorStates: {
        ...state.doorStates,
        [room]: { ...state.doorStates[room], isHovered },
      },
    })),
}))
