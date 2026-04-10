import { useSyncExternalStore } from 'react'

const DEFAULT_QUERY = '(max-width: 767px)'

function readMatch(query: string): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false
  }

  return window.matchMedia(query).matches
}

export function useIsCompact(query = DEFAULT_QUERY): boolean {
  return useSyncExternalStore(
    (onStoreChange) => {
      if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
        return () => {}
      }

      const media = window.matchMedia(query)
      media.addEventListener('change', onStoreChange)

      return () => media.removeEventListener('change', onStoreChange)
    },
    () => readMatch(query),
    () => false,
  )
}
