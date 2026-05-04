import { useEffect, useState, useSyncExternalStore } from 'react'
import {
  getPendingGlobalRequests,
  subscribeGlobalLoading,
} from '../../loadingTracker'

const HIDE_DELAY_MS = 180

export default function GlobalLoadingOverlay() {
  const pendingRequests = useSyncExternalStore(
    subscribeGlobalLoading,
    getPendingGlobalRequests,
    getPendingGlobalRequests,
  )
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (pendingRequests > 0) {
      setVisible(true)
      return
    }

    const timeoutId = window.setTimeout(() => {
      setVisible(false)
    }, HIDE_DELAY_MS)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [pendingRequests])

  if (!visible) {
    return null
  }

  return (
    <div className="global-loading-overlay" role="status" aria-live="polite" aria-label="Loading content">
      <div className="global-loading-panel">
        <p className="global-loading-message">Loading page content...</p>
        <div className="global-loading-track" aria-hidden="true">
          <span className="global-loading-bar" />
        </div>
      </div>
    </div>
  )
}
