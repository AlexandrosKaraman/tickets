export function getAllTickets<T = any>(): Promise<T> {
  return fetch("/tickets.json")
    .then((res) => res.json())
    .then((res) => new Promise((resolve) => {
      setTimeout(() => {
        resolve(res)
      }, 1500)
    }))
}
