// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getAllTickets<T = any>(): Promise<T> {
  return fetch("/tickets.json")
    .then((res) => res.json())
    .then((res) => new Promise((resolve) => {
      setTimeout(() => {
        resolve(res)
      }, 1500)
    }))
}
