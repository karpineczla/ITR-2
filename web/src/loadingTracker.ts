type Listener = () => void

let pendingRequests = 0
const listeners = new Set<Listener>()

const notify = () => {
  listeners.forEach((listener) => listener())
}

export const beginGlobalLoading = () => {
  pendingRequests += 1
  notify()
}

export const endGlobalLoading = () => {
  pendingRequests = Math.max(0, pendingRequests - 1)
  notify()
}

export const getPendingGlobalRequests = () => pendingRequests

export const subscribeGlobalLoading = (listener: Listener) => {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}
